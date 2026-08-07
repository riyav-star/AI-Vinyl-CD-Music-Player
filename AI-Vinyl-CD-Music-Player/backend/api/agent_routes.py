from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from agent.music_agent import run_music_agent
from agent.memory import (
    add_message,
    get_history,
    clear_history
)


router = APIRouter()


class AgentRequest(BaseModel):
    message: str


@router.post("/chat")
def chat_with_agent(request: AgentRequest):

    add_message(
        "user",
        request.message
    )

    try:
        result = run_music_agent(
            request.message,
            history=get_history()
        )
    except RuntimeError as error:
        # Most likely OPENAI_API_KEY isn't set - surface a clear message
        # instead of a raw 500.
        raise HTTPException(status_code=503, detail=str(error))

    add_message(
        "assistant",
        result["message"]
    )

    return {
        "response": result["message"],
        "playlist": result["playlist"],
        "history": get_history()
    }


@router.post("/reset")
def reset_conversation():
    clear_history()
    return {"status": "cleared"}
