from pydantic import BaseModel


class Song(BaseModel):
    id: int
    title: str
    artist: str
    genre: str
    mood: str
    duration: str
    cover: str
    audio: str
    energy: float
    danceability: float