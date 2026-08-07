# AI Vinyl CD Music Player

A vinyl-styled music player with an AI DJ agent. Users describe what they want to hear in plain language, and a LangGraph agent picks songs from the library and builds a named playlist.

## Tech stack

- Frontend: React 18, Vite, Lucide React
- Backend: FastAPI, Pydantic
- AI: LangGraph, LangChain, OpenAI
- Storage: SQLite
- Language: Python, JavaScript

## Features

- Vinyl and CD-inspired music player interface
- AI DJ agent for natural-language music requests
- HTML5 audio playback and controls
- Mood-based music selection
- AI-powered song searching and filtering
- Personalized playlist generation
- Energy and danceability analysis
- AI DJ chat interface
- Music library with song metadata
- Unique music-themed visual design
- Agentic workflow using LangGraph tools
- SQLite database structure for future playlist persistence

Example AI DJ Requests
Users can interact with the AI DJ using natural language:
Create a chill playlist for studying.
Give me energetic songs for a workout.
Find some romantic music for a date night.
I want something upbeat and happy.
The AI agent interprets the request and decides which music tools to use before creating a playlist.
Project Structure
AI-vinyl-cd-music-player/
│
├── backend/
│   ├── agent/
│   │   ├── music_agent.py
│   │   ├── tools.py
│   │   ├── prompts.py
│   │   └── memory.py
│   │
│   ├── api/
│   │   ├── agent_routes.py
│   │   ├── music_routes.py
│   │   └── playlist_routes.py
│   │
│   ├── services/
│   │   ├── recommendation_service.py
│   │   ├── audio_analysis.py
│   │   └── spotify_service.py
│   │
│   ├── database/
│   │   ├── database.py
│   │   └── schema.sql
│   │
│   ├── models/
│   │   ├── song.py
│   │   └── playlist.py
│   │
│   ├── data/
│   │   └── songs.json
│   │
│   ├── main.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── VinylPlayer.jsx
│   │   │   ├── AudioControls.jsx
│   │   │   ├── MoodSelector.jsx
│   │   │   ├── Playlist.jsx
│   │   │   ├── AIChat.jsx
│   │   │   └── SongCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Player.jsx
│   │   │   └── Library.jsx
│   │   │
│   │   ├── api/
│   │   │   └── api.js
│   │   │
│   │   ├── utils/
│   │   │   └── audioHelpers.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
├── LICENSE
└── README.md

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
