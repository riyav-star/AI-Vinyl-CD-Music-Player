import Playlist from "../components/Playlist";

function Library({
  playlist,
  setPlaylist,
  playSong
}) {
  return (
    <section className="library-page">
      <div className="library-header">
        <span className="eyebrow">
          YOUR COLLECTION
        </span>

        <h1>Music Library</h1>

        <p>
          Your personalized collection of songs
          and AI-curated playlists.
        </p>
      </div>

      <Playlist
        songs={playlist}
        playSong={playSong}
      />

      {playlist.length > 0 && (
        <button
          className="clear-button"
          onClick={() => setPlaylist([])}
        >
          Clear Library
        </button>
      )}
    </section>
  );
}

export default Library;