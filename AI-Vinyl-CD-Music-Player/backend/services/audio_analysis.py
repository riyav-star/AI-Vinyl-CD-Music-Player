def analyze_song(song):
    energy = song.get("energy", 0)
    danceability = song.get(
        "danceability",
        0
    )

    if energy >= 0.75:
        energy_label = "High"
    elif energy >= 0.45:
        energy_label = "Medium"
    else:
        energy_label = "Low"

    if danceability >= 0.7:
        danceability_label = "High"
    elif danceability >= 0.4:
        danceability_label = "Medium"
    else:
        danceability_label = "Low"

    return {
        "energy": energy,
        "energy_label": energy_label,
        "danceability": danceability,
        "danceability_label": danceability_label
    }