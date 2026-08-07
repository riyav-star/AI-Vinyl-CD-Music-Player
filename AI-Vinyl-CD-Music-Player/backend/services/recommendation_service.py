import json


def load_songs():
    with open(
        "data/songs.json",
        "r",
        encoding="utf-8"
    ) as file:
        return json.load(file)


def recommend_songs(mood, preferences):
    songs = load_songs()

    recommendations = []

    for song in songs:

        if song["mood"].lower() == mood.lower():
            recommendations.append(song)

        elif preferences:
            preference = preferences.lower()

            if preference in song["genre"].lower():
                recommendations.append(song)

    return recommendations