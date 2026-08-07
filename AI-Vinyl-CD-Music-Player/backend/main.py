from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.music_routes import router as music_router
from api.playlist_routes import router as playlist_router
from api.agent_routes import router as agent_router


app = FastAPI(
    title="AI Vinyl CD Music Player",
    description="Backend API for an AI-powered music player and DJ agent.",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


app.include_router(
    music_router,
    prefix="/api/music",
    tags=["Music"]
)

app.include_router(
    playlist_router,
    prefix="/api/playlist",
    tags=["Playlist"]
)

app.include_router(
    agent_router,
    prefix="/api/agent",
    tags=["AI DJ Agent"]
)


@app.get("/")
def root():
    return {
        "message": "AI Vinyl CD Music Player API is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }