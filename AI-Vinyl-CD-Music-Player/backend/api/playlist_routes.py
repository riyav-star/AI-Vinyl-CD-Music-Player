from fastapi import APIRouter

from models.playlist import (
    PlaylistRequest,
    PlaylistResponse
)

from services.recommendation_service import (
    recommend_songs
)


router = APIRouter()


@router.post("", response_model=PlaylistResponse)
def create_playlist(request: PlaylistRequest):

    songs = recommend_songs(
        request.mood,
        request.preferences
    )

    playlist_name = (
        request.mood.capitalize()
        + " AI Playlist"
    )

    return {
        "name": playlist_name,
        "mood": request.mood,
        "songs": songs
    }