import { useState } from "react";
import VinylPlayer from "../components/VinylPlayer";
import AudioControls from "../components/AudioControls";
import MoodSelector from "../components/MoodSelector";
import Playlist from "../components/Playlist";
import AIChat from "../components/AIChat";
import SongCard from "../components/SongCard";

const songs = [
  {
    id: 1,
    title: "Midnight Drive",
    artist: "AI Radio",
    genre: "Chill",
    duration: "3:42",
    cover:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500",
    audio: ""
  },
  {
    id: 2,
    title: "Neon Dreams",
    artist: "Future Sounds",
    genre: "Electronic",
    duration: "4:10",
    cover:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500",
    audio: ""
  },
  {
    id: 3,
    title: "Golden Hour",
    artist: "Sunset Collective",
    genre: "Indie",
    duration: "3:56",
    cover:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=500",
    audio: ""
  },
  {
    id: 4,
    title: "After Hours",
    artist: "Nightwave",
    genre: "R&B",
    duration: "4:25",
    cover:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500",
    audio: ""
  }
];

function Home({
  currentSong,
  isPlaying,
  setIsPlaying,
  playSong,
  playlist,
  setPlaylist
}) {
  const [selectedMood, setSelectedMood] =
    useState("Focus");

  const addToPlaylist = (song) => {
    const exists = playlist.some(
      (item) => item.id === song.id
    );

    if (!exists) {
      setPlaylist([...playlist, song]);
    }
  };

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">
            YOUR PERSONAL AI DJ
          </span>

          <h1>
            Music that
            <br />
            <span>moves with you.</span>
          </h1>

          <p>
            Discover music, build playlists, and let
            your AI DJ create the perfect soundtrack
            for every moment.
          </p>

          <div className="hero-tags">
            <span>AI Curated</span>
            <span>Vinyl Inspired</span>
            <span>Personalized</span>
          </div>
        </div>
      </section>

      <section className="player-section">
        <div className="player-main">
          <VinylPlayer
            song={currentSong || songs[0]}
            isPlaying={isPlaying}
          />

          <AudioControls
            song={currentSong || songs[0]}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        </div>

        <AIChat />
      </section>

      <MoodSelector
        selectedMood={selectedMood}
        setSelectedMood={setSelectedMood}
      />

      <section className="discover-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              DISCOVER
            </span>

            <h2>Made for you</h2>
          </div>
        </div>

        <div className="song-grid">
          {songs.map((song) => (
            <div key={song.id}>
              <SongCard
                song={song}
                playSong={playSong}
              />

              <button
                className="add-playlist"
                onClick={() =>
                  addToPlaylist(song)
                }
              >
                + Add to playlist
              </button>
            </div>
          ))}
        </div>
      </section>

      <Playlist
        songs={playlist}
        playSong={playSong}
      />
    </div>
  );
}

export default Home;