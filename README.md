# AI Vinyl CD Music Player

A vinyl-styled music player with an AI DJ agent. Users describe what they want to hear in plain language, and a LangGraph agent picks songs from the library and builds a named playlist.

## Tech stack

- Frontend: React 18, Vite, Lucide React
- Backend: FastAPI, Pydantic
- AI: LangGraph, LangChain, OpenAI
- Storage: SQLite
- Language: Python, JavaScript

## Features

- Vinyl-style player UI with playback controls and a song library page
- Mood-based playlist creation through a dedicated endpoint
- AI DJ chat: describe a mood, activity, or genre and the agent searches the song catalog, filters by mood or energy, and returns a playlist with a short explanation
- Song metadata includes energy and danceability scores, used by the agent's filtering tools

## Project structure

```
backend/
  agent/
    music_agent.py     # LangGraph agent: reasons over requests, calls tools
    tools.py            # search_songs, filter_by_mood, filter_by_energy, create_playlist
    prompts.py           # system prompt for the AI DJ
    memory.py            # in-memory conversation history
  api/
    agent_routes.py      # POST /api/agent/chat, POST /api/agent/reset
    music_routes.py       # GET /api/music, GET /api/music/{id}
    playlist_routes.py    # POST /api/playlist
  services/
    recommendation_service.py  # mood/genre based recommendations
    audio_analysis.py           # energy/danceability labeling
    spotify_service.py           # stub, not yet connected
  database/
    schema.sql            # playlists / playlist_songs tables
    database.py             # SQLite connection helper
  models/                    # Pydantic request/response models
  data/songs.json              # local song catalog
frontend/
  src/
    pages/                   # Home, Player, Library
    components/               # VinylPlayer, AudioControls, MoodSelector, Playlist, AIChat, SongCard, Navbar
    api/api.js                 # fetch client for the backend
    utils/audioHelpers.js
```

## Setup

### Backend

```
cd backend
pip install -r requirements.txt
```

Add a real OpenAI key to `backend/.env`:

```
OPENAI_API_KEY=sk-...
```

Run the server:

```
uvicorn main:app --reload
```

The API is available at `http://localhost:8000`, with interactive docs at `/docs`.

### Frontend

```
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173` and expects the backend at `http://localhost:8000` by default. Override with `VITE_API_URL` if needed.

## How the AI DJ agent works

`POST /api/agent/chat` takes a user message and runs it through a LangGraph agent built in `backend/agent/music_agent.py`. The agent has two nodes: one calls the LLM with tools bound, the other executes whichever tool the model asked for. The loop continues until the model responds without a tool call.

Tools available to the agent:

- `search_songs(query)` — free-text match against title, artist, genre, mood
- `filter_by_mood(mood)` — exact match on mood label
- `filter_by_energy(min_energy)` — songs at or above an energy threshold
- `create_playlist(songs, name)` — finalizes the result

The agent decides which tools to call and in what order based on the request, then returns a short explanation along with the playlist. Conversation history is passed in on each request so follow-up messages have context.

If `OPENAI_API_KEY` isn't set, the endpoint returns a 503 with a clear error rather than failing silently.

## Known gaps

- **Spotify integration** (`backend/services/spotify_service.py`) is a stub that returns `"status": "not_connected"`. Real search isn't implemented.
- **Playlist persistence**: the SQLite schema exists but no route writes to it yet. Playlists are generated per request and not saved between sessions.
- **Conversation memory** (`backend/agent/memory.py`) is a single in-memory list shared across all requests. It resets on server restart and isn't scoped per user, so it isn't suited for multiple concurrent users.
- **Song catalog** is a static local JSON file rather than a live source.

## License
# AI Vinyl CD Music Player

A vinyl-styled music player with an AI DJ agent. Users describe what they want to hear in plain language, and a LangGraph agent picks songs from the library and builds a named playlist.

## Tech stack

**Frontend:** React 18, Vite, lucide-react
**Backend:** FastAPI, Pydantic
**AI agent:** LangGraph, LangChain, OpenAI (`gpt-4o-mini`)
**Storage:** SQLite (schema defined, not yet wired to the API)

## Features

- Vinyl-style player UI with playback controls and a song library page
- Mood-based playlist creation through a dedicated endpoint
- AI DJ chat: describe a mood, activity, or genre and the agent searches the song catalog, filters by mood or energy, and returns a playlist with a short explanation
- Song metadata includes energy and danceability scores, used by the agent's filtering tools

## Project structure

```
backend/
  agent/
    music_agent.py     # LangGraph agent: reasons over requests, calls tools
    tools.py            # search_songs, filter_by_mood, filter_by_energy, create_playlist
    prompts.py           # system prompt for the AI DJ
    memory.py            # in-memory conversation history
  api/
    agent_routes.py      # POST /api/agent/chat, POST /api/agent/reset
    music_routes.py       # GET /api/music, GET /api/music/{id}
    playlist_routes.py    # POST /api/playlist
  services/
    recommendation_service.py  # mood/genre based recommendations
    audio_analysis.py           # energy/danceability labeling
    spotify_service.py           # stub, not yet connected
  database/
    schema.sql            # playlists / playlist_songs tables
    database.py             # SQLite connection helper
  models/                    # Pydantic request/response models
  data/songs.json              # local song catalog
frontend/
  src/
    pages/                   # Home, Player, Library
    components/               # VinylPlayer, AudioControls, MoodSelector, Playlist, AIChat, SongCard, Navbar
    api/api.js                 # fetch client for the backend
    utils/audioHelpers.js
```

## Setup

### Backend

```
cd backend
pip install -r requirements.txt
```

Add a real OpenAI key to `backend/.env`:

```
OPENAI_API_KEY=sk-...
```

Run the server:

```
uvicorn main:app --reload
```

The API is available at `http://localhost:8000`, with interactive docs at `/docs`.

### Frontend

```
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173` and expects the backend at `http://localhost:8000` by default. Override with `VITE_API_URL` if needed.

## How the AI DJ agent works

`POST /api/agent/chat` takes a user message and runs it through a LangGraph agent built in `backend/agent/music_agent.py`. The agent has two nodes: one calls the LLM with tools bound, the other executes whichever tool the model asked for. The loop continues until the model responds without a tool call.

Tools available to the agent:

- `search_songs(query)` — free-text match against title, artist, genre, mood
- `filter_by_mood(mood)` — exact match on mood label
- `filter_by_energy(min_energy)` — songs at or above an energy threshold
- `create_playlist(songs, name)` — finalizes the result

The agent decides which tools to call and in what order based on the request, then returns a short explanation along with the playlist. Conversation history is passed in on each request so follow-up messages have context.

If `OPENAI_API_KEY` isn't set, the endpoint returns a 503 with a clear error rather than failing silently.

## Known gaps

- **Spotify integration** (`backend/services/spotify_service.py`) is a stub that returns `"status": "not_connected"`. Real search isn't implemented.
- **Playlist persistence**: the SQLite schema exists but no route writes to it yet. Playlists are generated per request and not saved between sessions.
- **Conversation memory** (`backend/agent/memory.py`) is a single in-memory list shared across all requests. It resets on server restart and isn't scoped per user, so it isn't suited for multiple concurrent users.
- **Song catalog** is a static local JSON file rather than a live source.

## License
This project is licensed under the MIT License.
See the LICENSE file for details.
