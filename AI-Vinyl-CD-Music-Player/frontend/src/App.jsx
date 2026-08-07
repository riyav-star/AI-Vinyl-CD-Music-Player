import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Player from "./pages/Player";
import Library from "./pages/Library";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const [currentSong, setCurrentSong] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const [playlist, setPlaylist] = useState([]);

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const renderPage = () => {
    if (currentPage === "player") {
      return (
        <Player
          currentSong={currentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      );
    }

    if (currentPage === "library") {
      return (
        <Library
          playlist={playlist}
          setPlaylist={setPlaylist}
          playSong={playSong}
        />
      );
    }

    return (
      <Home
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        playSong={playSong}
        playlist={playlist}
        setPlaylist={setPlaylist}
      />
    );
  };

  return (
    <div className="app">
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;