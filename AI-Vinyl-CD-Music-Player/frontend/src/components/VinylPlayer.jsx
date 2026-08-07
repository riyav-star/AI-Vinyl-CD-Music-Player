import { Disc3 } from "lucide-react";

function VinylPlayer({ song, isPlaying }) {
  if (!song) {
    return (
      <div className="vinyl-container">

        <div className="vinyl">
          <div className="vinyl-lines"></div>

          <div className="vinyl-center">
            <Disc3 size={35} />
          </div>
        </div>

        <p className="no-song">
          Choose a song to start listening
        </p>

      </div>
    );
  }

  let vinylClass = "vinyl";

  if (isPlaying) {
    vinylClass = "vinyl spinning";
  }

  return (
    <div className="vinyl-container">

      <div className={vinylClass}>

        <div className="vinyl-grooves"></div>

        <img
          src={song.cover}
          alt={song.title}
          className="vinyl-cover"
        />

        <div className="vinyl-center">
          <div className="vinyl-label"></div>
        </div>

      </div>

      <div className="song-info">
        <h2>{song.title}</h2>
        <p>{song.artist}</p>
      </div>

    </div>
  );
}

export default VinylPlayer;