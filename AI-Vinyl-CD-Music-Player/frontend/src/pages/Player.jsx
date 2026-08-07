import VinylPlayer from "../components/VinylPlayer";
import AudioControls from "../components/AudioControls";

function Player({
  currentSong,
  isPlaying,
  setIsPlaying
}) {
  return (
    <section className="full-player">
      <span className="eyebrow">
        NOW PLAYING
      </span>

      <h1>Your Music</h1>

      <VinylPlayer
        song={currentSong}
        isPlaying={isPlaying}
      />

      <AudioControls
        song={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </section>
  );
}

export default Player;