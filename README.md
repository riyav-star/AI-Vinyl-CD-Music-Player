# AI Vinyl CD Music Player

A vinyl-styled music player with an AI DJ agent. Users describe what they want to hear in plain language, and a LangGraph agent picks songs from the library and builds a named playlist.

## Tech Stack

- **Frontend:** React 18, Vite, Lucide React
- **Backend:** FastAPI, Pydantic
- **AI:** LangGraph, LangChain, OpenAI (gpt-4o-mini)
- **Storage:** SQLite
- **Languages:** Python, JavaScript

## Features

- Vinyl and CD-inspired music player interface
- AI DJ agent for natural-language music requests, using LangGraph tool calling
- HTML5 audio playback and controls
- Mood-based playlist creation
- Energy and danceability metadata on each song
- Music library page with song metadata
- SQLite schema in place for future playlist persistence

## Example AI DJ Requests

- "Create a chill playlist for studying."
- "Give me energetic songs for a workout."
- "Find some romantic music for a date night."
- "I want something upbeat and happy."

The agent interprets the request and decides which tools to call before creating a playlist.

## Project Structure

```
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
```

## Setup

### Backend

```
cd backend
pip install -r requirements.txt
```

Create a `.env` file inside the backend directory:

```
OPENAI_API_KEY=your_openai_api_key
```

Start the FastAPI server:

```
uvicorn main:app --reload
```

The API runs at `http://localhost:8000`, with interactive docs at `http://localhost:8000/docs`.

### Frontend

```
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173` and expects the backend at `http://localhost:8000`. Override with the `VITE_API_URL` environment variable if needed.

## How the AI DJ Agent Works

The AI DJ is a LangGraph agent defined in `backend/agent/music_agent.py`. A request to `POST /api/agent/chat` is passed into a two-node graph:

- **Agent node** — sends the conversation to the LLM with the music tools bound, so the model can decide whether to call one or respond directly.
- **Tools node** — executes whichever tool the model chose and returns the result to the agent node.

These two nodes loop until the model responds without requesting another tool call, at which point the agent's final message and the playlist it built are returned together.

## AI DJ Tools

- `search_songs(query)` — free-text match against title, artist, genre, mood
- `filter_by_mood(mood)` — exact match on mood label
- `filter_by_energy(min_energy)` — songs at or above an energy threshold
- `create_playlist(songs, name)` — finalizes the selected songs into a named playlist

The agent decides which tools to call and in what order based on the request.

## Music Metadata

Each song includes:

- Title, artist, genre, mood, duration
- Album artwork and audio source
- Energy score and danceability score

These scores let the agent filter recommendations more precisely than a text search alone.

## Conversation Memory

Conversation history is passed into the agent on each request, so follow-up messages should carry context from earlier in the chat — for example, asking to make a playlist "more energetic" after an initial mood-based request. This hasn't been tested against a live OpenAI key yet, so treat it as expected behavior from the implementation rather than a confirmed example.

The current implementation stores history in a single in-memory list shared across all requests.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/music` | Retrieve all songs |
| GET | `/api/music/{id}` | Retrieve a specific song |
| POST | `/api/playlist` | Create a mood-based playlist |
| POST | `/api/agent/chat` | Send a request to the AI DJ |
| POST | `/api/agent/reset` | Clear AI DJ conversation history |
| GET | `/health` | Check backend status |

## Known Gaps

- **Spotify integration:** `backend/services/spotify_service.py` is currently a stub. Real Spotify search has not been implemented.
- **Playlist persistence:** the SQLite schema exists, but no route writes to it yet. Playlists are generated per request and not saved.
- **Conversation memory:** stored in a single in-memory list that resets on server restart and isn't scoped per user.
- **Song catalog:** songs come from a static local JSON file rather than a live music service.

## Future Improvements

- Spotify API integration
- Persistent user playlists
- User authentication
- Per-user AI memory
- Listening history
- Playlist editing and saving
- Audio feature analysis

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
