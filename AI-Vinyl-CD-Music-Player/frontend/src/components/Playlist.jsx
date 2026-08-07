import {
  Music2,
  Play
} from "lucide-react";

function Playlist({ songs, playSong }) {
  let playlistContent;

  if (songs.length === 0) {
    playlistContent = (
      <p className="empty-message">
        Your playlist is empty.
      </p>
    );
  } else {
    playlistContent = songs.map((song, index) => (
      <div
        className="playlist-item"
        key={song.id}
      >
        <span className="track-number">
          {String(index + 1).padStart(2, "0")}
        </span>

        <img
          src={song.cover}
          alt={song.title}
        />

        <div className="playlist-song-info">
          <h4>{song.title}</h4>

          <p>{song.artist}</p>
        </div>

        <span className="playlist-duration">
          {song.duration}
        </span>

        <button
          className="small-play"
          onClick={() => playSong(song)}
        >
          <Play size={16} />
        </button>
      </div>
    ));
  }

  return (
    <div className="playlist">

      <div className="section-heading">

        <div>
          <span className="eyebrow">
            YOUR COLLECTION
          </span>

          <h2>Recently Added</h2>
        </div>

        <Music2 size={24} />

      </div>

      <div className="playlist-list">
        {playlistContent}
      </div>

    </div>
  );
}

export default Playlist;