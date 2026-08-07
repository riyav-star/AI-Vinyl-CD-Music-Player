import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState
} from "react";

function AudioControls({
  song,
  isPlaying,
  setIsPlaying
}) {
  const audioRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);

  useEffect(() => {
    if (!song) {
      return;
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current
          .play()
          .catch(() => {
            setIsPlaying(false);
          });
      } else {
        audioRef.current.pause();
      }
    }
  }, [song, isPlaying, setIsPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const updateProgress = () => {
    if (!audioRef.current) {
      return;
    }

    const currentTime =
      audioRef.current.currentTime;

    const duration =
      audioRef.current.duration;

    if (duration) {
      const percentage =
        (currentTime / duration) * 100;

      setProgress(percentage);
    }
  };

  const handleProgress = (event) => {
    if (!audioRef.current) {
      return;
    }

    const value =
      Number(event.target.value);

    const duration =
      audioRef.current.duration;

    if (duration) {
      audioRef.current.currentTime =
        (value / 100) * duration;

      setProgress(value);
    }
  };

  const togglePlay = () => {
    if (!song) {
      return;
    }

    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  return (
    <div className="audio-controls">

      {song && (
        <audio
          ref={audioRef}
          src={song.audio}
          onTimeUpdate={updateProgress}
          onEnded={() =>
            setIsPlaying(false)
          }
        />
      )}

      <div className="progress-container">

        <span>0:00</span>

        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgress}
          className="progress-bar"
        />

        <span>3:42</span>

      </div>

      <div className="controls-row">

        <button className="control-button">
          <SkipBack size={22} />
        </button>

        <button
          className="play-button"
          onClick={togglePlay}
          disabled={!song}
        >
          {isPlaying ? (
            <Pause size={25} />
          ) : (
            <Play size={25} />
          )}
        </button>

        <button className="control-button">
          <SkipForward size={22} />
        </button>

        <div className="volume-control">

          <Volume2 size={20} />

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(event) =>
              setVolume(
                Number(event.target.value)
              )
            }
          />

        </div>

      </div>

    </div>
  );
}

export default AudioControls;