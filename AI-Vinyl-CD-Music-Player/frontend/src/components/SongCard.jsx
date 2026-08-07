import { Play } from "lucide-react";

function SongCard({ song, playSong }) {
  return (
    <div className="song-card">
      <div className="song-image-container">
        <img
          src={song.cover}
          alt={song.title}
          className="song-image"
        />

        <button
          className="song-play"
          onClick={() => playSong(song)}
        >
          <Play size={18} fill="currentColor" />
        </button>
      </div>

      <div className="song-card-info">
        <h3>{song.title}</h3>
        <p>{song.artist}</p>

        <span>{song.genre}</span>
      </div>
    </div>
  );
}

export default SongCard;