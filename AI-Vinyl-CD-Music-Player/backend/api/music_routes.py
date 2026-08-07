import json

from fastapi import APIRouter

from models.song import Song


router = APIRouter()


def load_songs():
    with open(
        "data/songs.json",
        "r",
        encoding="utf-8"
    ) as file:
        return json.load(file)


@router.get("", response_model=list[Song])
def get_songs():
    songs = load_songs()

    return songs


@router.get("/{song_id}")
def get_song(song_id: int):
    songs = load_songs()

    for song in songs:
        if song["id"] == song_id:
            return song

    return {
        "error": "Song not found"
    }