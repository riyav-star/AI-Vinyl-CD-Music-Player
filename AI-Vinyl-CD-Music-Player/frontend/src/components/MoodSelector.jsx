import {
  Moon,
  Sun,
  Flame,
  Cloud,
  Heart
} from "lucide-react";

const moods = [
  {
    name: "Focus",
    icon: <Moon size={20} />
  },
  {
    name: "Happy",
    icon: <Sun size={20} />
  },
  {
    name: "Energy",
    icon: <Flame size={20} />
  },
  {
    name: "Chill",
    icon: <Cloud size={20} />
  },
  {
    name: "Romantic",
    icon: <Heart size={20} />
  }
];

function MoodSelector({
  selectedMood,
  setSelectedMood
}) {
  return (
    <div className="mood-section">

      <div className="section-heading">

        <div>

          <span className="eyebrow">
            AI MUSIC CURATOR
          </span>

          <h2>Choose your mood</h2>

        </div>

      </div>

      <div className="mood-grid">

        {moods.map((mood) => {

          let buttonClass = "mood-button";

          if (selectedMood === mood.name) {
            buttonClass =
              "mood-button selected";
          }

          return (
            <button
              key={mood.name}
              className={buttonClass}
              onClick={() =>
                setSelectedMood(mood.name)
              }
            >
              {mood.icon}

              <span>
                {mood.name}
              </span>

            </button>
          );
        })}

      </div>

    </div>
  );
}

export default MoodSelector;