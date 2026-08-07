import {
  Home,
  Disc3,
  Library as LibraryIcon,
  Sparkles
} from "lucide-react";

function Navbar({ currentPage, setCurrentPage }) {
  const navItems = [
    {
      name: "Home",
      page: "home",
      icon: <Home size={18} />
    },
    {
      name: "Player",
      page: "player",
      icon: <Disc3 size={18} />
    },
    {
      name: "Library",
      page: "library",
      icon: <LibraryIcon size={18} />
    }
  ];

  const getButtonClass = (page) => {
    let buttonClass = "";

    if (currentPage === page) {
      buttonClass = "active";
    }

    return buttonClass;
  };

  return (
    <nav className="navbar">

      <div
        className="logo"
        onClick={() => setCurrentPage("home")}
      >
        <div className="logo-disc">
          <Disc3 size={25} />
        </div>

        <div>
          <h2>AuraTunes</h2>
          <span>AI Music Studio</span>
        </div>
      </div>

      <div className="nav-links">

        {navItems.map((item) => (
          <button
            key={item.page}
            className={getButtonClass(item.page)}
            onClick={() =>
              setCurrentPage(item.page)
            }
          >
            {item.icon}
            {item.name}
          </button>
        ))}

      </div>

      <button className="ai-button">
        <Sparkles size={18} />
        AI DJ
      </button>

    </nav>
  );
}

export default Navbar;