# AI Vinyl CD Music Player

A vinyl-styled music player with an AI DJ agent. Users describe what they want to hear in plain language, and a LangGraph agent picks songs from the library and builds a named playlist.

## Tech Stack

* **Frontend:** React 18, Vite, Lucide React
* **Backend:** FastAPI, Pydantic
* **AI:** LangGraph, LangChain, OpenAI
* **Storage:** SQLite
* **Languages:** Python, JavaScript

## Features

* Vinyl and CD-inspired music player interface
* AI DJ agent for natural-language music requests
* HTML5 audio playback and controls
* Mood-based music selection
* AI-powered song searching and filtering
* Personalized playlist generation
* Energy and danceability analysis
* AI DJ chat interface
* Music library with song metadata
* Unique music-themed visual design
* Agentic workflow using LangGraph tools
* SQLite database structure for future playlist persistence

## Example AI DJ Requests

Users can interact with the AI DJ using natural language:

* "Create a chill playlist for studying."
* "Give me energetic songs for a workout."
* "Find some romantic music for a date night."
* "I want something upbeat and happy."

The AI agent interprets the request and decides which music tools to use before creating a playlist.

## Project Structure

```text
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

Navigate to the backend directory:

```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file inside the `backend` directory:

```env
OPENAI_API_KEY=your_openai_api_key
```

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

The API is available at:

```text
http://localhost:8000
```

Interactive API documentation is available at:

```text
http://localhost:8000/docs
```

### Frontend

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
npm run dev
```

The application runs at:

```text
http://localhost:5173
```

The frontend expects the backend at:

```text
http://localhost:8000
```

You can override the backend URL with the `VITE_API_URL` environment variable.

## How the AI DJ Agent Works

The AI DJ is implemented using a LangGraph agent in:

```text
backend/agent/music_agent.py
```

When a user sends a request to:

```text
POST /api/agent/chat
```

the request is passed to the AI DJ agent.

The agent contains two main stages:

1. **LLM Node** — sends the user's request to the language model and determines which music tool should be used.
2. **Tool Node** — executes the selected tool and returns the results to the agent.

The process continues until the agent has enough information to create the final playlist.

### Agent Workflow

```text
User Request
      ↓
   AI DJ Agent
      ↓
 Understand Request
      ↓
 Select Tool
      ↓
 Execute Tool
      ↓
 Analyze Results
      ↓
 More Tools Needed
      ↓
 Create Playlist
      ↓
 Return Explanation + Playlist
```

## AI DJ Tools

The agent can use the following tools:

### `search_songs(query)`

Performs a free-text search against the local music catalog using:

* Song title
* Artist
* Genre
* Mood

### `filter_by_mood(mood)`

Finds songs that match a specific mood.

### `filter_by_energy(min_energy)`

Finds songs with an energy score at or above the specified threshold.

### `create_playlist(songs, name)`

Finalizes the selected songs into a named playlist.

The agent decides which tools to call and in what order based on the user's request.

## Music Metadata

Each song contains metadata such as:

* Title
* Artist
* Genre
* Mood
* Duration
* Album artwork
* Audio source
* Energy score
* Danceability score

Energy and danceability values allow the AI DJ to make more specific recommendations.

## Conversation Memory

Conversation history is passed through the AI DJ workflow so follow-up requests can maintain context.

For example:

```text
User: Create a chill playlist for studying.

AI DJ: Creates a chill study playlist.

User: Make it more energetic.

AI DJ: Uses the previous request as context and adjusts the recommendations.
```

The current implementation uses in-memory conversation history.

## API Endpoints

| Method | Endpoint          | Description                  |
| ------ | ----------------- | ---------------------------- |
| GET    | `/api/music`      | Retrieve all songs           |
| GET    | `/api/music/{id}` | Retrieve a specific song     |
| POST   | `/api/playlist`   | Create a mood-based playlist |
| POST   | `/api/agent/chat` | Send a request to the AI DJ  |
| GET    | `/health`         | Check backend status         |

## Known Gaps

* **Spotify integration:** `backend/services/spotify_service.py` is currently a stub. Real Spotify search has not been implemented.
* **Playlist persistence:** The SQLite schema exists, but playlists are not currently written to the database.
* **Conversation memory:** The current memory implementation uses a single in-memory list and resets when the server restarts.
* **User-specific memory:** Conversation history is not yet separated between users.
* **Song catalog:** Songs currently come from a static local JSON file rather than a live music service.

## Future Improvements

* Spotify API integration
* Persistent user playlists
* User authentication
* User-specific AI memory
* Listening history
* Playlist editing and saving
* More advanced music recommendations
* Audio feature analysis
* Automatic playlist continuation
* Expanded AI DJ capabilities

## License

This project is licensed under the **MIT License**.

See the `LICENSE` file for details.

