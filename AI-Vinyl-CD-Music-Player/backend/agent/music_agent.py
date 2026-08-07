import json
import os

from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.tools import tool
from langchain_openai import ChatOpenAI
from langgraph.graph import StateGraph, END, MessagesState
from langgraph.prebuilt import ToolNode

from agent.prompts import AI_DJ_SYSTEM_PROMPT
from agent import tools as _tools


# --- Tool wrappers -----------------------------------------------------
# These wrap the plain functions in agent/tools.py so the LLM can call them.
# Inputs/outputs are JSON strings since that's what tool-calling models
# work with most reliably.

@tool
def search_songs(query: str) -> str:
    """Search songs by a free-text keyword matched against title, artist,
    genre, or mood. Use this when the request doesn't map to an exact mood
    or energy filter."""
    return json.dumps(_tools.search_songs(query))


@tool
def filter_by_mood(mood: str) -> str:
    """Filter songs by an exact mood label. Valid values: Focus, Happy,
    Chill, Romantic, Energetic, Sad."""
    return json.dumps(_tools.filter_by_mood(mood))


@tool
def filter_by_energy(min_energy: float) -> str:
    """Filter songs with an energy score greater than or equal to
    min_energy, a float between 0.0 and 1.0. Use for workout/high-energy
    requests."""
    return json.dumps(_tools.filter_by_energy(min_energy))


@tool
def create_playlist(songs_json: str, name: str) -> str:
    """Create the final named playlist from a JSON array of song objects
    (as returned by search_songs / filter_by_mood / filter_by_energy).
    Always call this last to finalize your answer."""
    songs = json.loads(songs_json)
    return json.dumps(_tools.create_playlist(songs, name))


AGENT_TOOLS = [search_songs, filter_by_mood, filter_by_energy, create_playlist]


# --- Graph ---------------------------------------------------------------

def _build_graph():
    llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.3)
    llm_with_tools = llm.bind_tools(AGENT_TOOLS)

    def agent_node(state: MessagesState):
        response = llm_with_tools.invoke(state["messages"])
        return {"messages": [response]}

    def should_continue(state: MessagesState):
        last_message = state["messages"][-1]
        if getattr(last_message, "tool_calls", None):
            return "tools"
        return END

    tool_node = ToolNode(AGENT_TOOLS)

    workflow = StateGraph(MessagesState)
    workflow.add_node("agent", agent_node)
    workflow.add_node("tools", tool_node)
    workflow.set_entry_point("agent")
    workflow.add_conditional_edges(
        "agent",
        should_continue,
        {"tools": "tools", END: END},
    )
    workflow.add_edge("tools", "agent")

    return workflow.compile()


_graph = None


def _get_graph():
    # Built lazily so importing this module doesn't require an API key
    # (e.g. when just running tests or loading routes).
    global _graph
    if _graph is None:
        _graph = _build_graph()
    return _graph


def _extract_playlist(messages):
    """Walk the message history backwards and pull out the JSON payload
    from the most recent create_playlist tool call."""
    for message in reversed(messages):
        if getattr(message, "name", None) == "create_playlist":
            try:
                return json.loads(message.content)
            except (json.JSONDecodeError, TypeError):
                continue
    return None


def run_music_agent(user_request: str, history=None) -> dict:
    """Run the LangGraph DJ agent on a single user request.

    history: optional list of {"role": "user"|"assistant", "message": str}
    from agent/memory.py, used to give the agent conversational context.
    """
    if not os.getenv("OPENAI_API_KEY"):
        raise RuntimeError(
            "OPENAI_API_KEY is not set. Add a real key to backend/.env "
            "to run the AI DJ agent."
        )

    messages = [SystemMessage(content=AI_DJ_SYSTEM_PROMPT)]

    if history:
        for entry in history[:-1]:  # last entry is the current request, added below
            if entry["role"] == "user":
                messages.append(HumanMessage(content=entry["message"]))

    messages.append(HumanMessage(content=user_request))

    graph = _get_graph()
    result = graph.invoke({"messages": messages})
    final_messages = result["messages"]

    final_response = final_messages[-1].content or "Here's what I put together."
    playlist = _extract_playlist(final_messages)

    if playlist is None:
        # Agent never called create_playlist (e.g. couldn't find anything) -
        # fall back to an empty playlist rather than erroring out.
        playlist = _tools.create_playlist([], "AuraTunes AI Playlist")

    return {
        "message": final_response,
        "playlist": playlist,
    }
