import json


def get_all_songs():
    with open(
        "data/songs.json",
        "r",
        encoding="utf-8"
    ) as file:
        return json.load(file)


def search_songs(query):
    songs = get_all_songs()

    results = []

    query = query.lower()

    for song in songs:

        title = song["title"].lower()
        artist = song["artist"].lower()
        genre = song["genre"].lower()
        mood = song["mood"].lower()

        if (
            query in title
            or query in artist
            or query in genre
            or query in mood
        ):
            results.append(song)

    return results


def filter_by_mood(mood):
    songs = get_all_songs()

    results = []

    for song in songs:

        if song["mood"].lower() == mood.lower():
            results.append(song)

    return results


def filter_by_energy(min_energy):
    songs = get_all_songs()

    results = []

    for song in songs:

        if song["energy"] >= min_energy:
            results.append(song)

    return results


def create_playlist(songs, name):
    return {
        "name": name,
        "songs": songs,
        "song_count": len(songs)
    }