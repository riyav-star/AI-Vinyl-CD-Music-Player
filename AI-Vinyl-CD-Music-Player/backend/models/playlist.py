from pydantic import BaseModel
from typing import List


class PlaylistRequest(BaseModel):
    mood: str
    preferences: str


class PlaylistResponse(BaseModel):
    name: str
    mood: str
    songs: List[dict]