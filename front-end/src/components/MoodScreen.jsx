import "./MoodScreen.css";

export default function MoodScreen({ onSelectMood, onBack }) {
  const moods = [
    {
      key: "lazy",
      label: "Lazy",
      emoji: "🛋️",
      desc: "Quick & comfy",
    },
    {
      key: "fancy",
      label: "Fancy",
      emoji: "🍷",
      desc: "Date-night vibes",
    },
    {
      key: "classy",
      label: "Classy",
      emoji: "🍽️",
      desc: "A little upscale",
    },
    {
      key: "homie",
      label: "Homie",
      emoji: "🏠",
      desc: "Home cooked feels",
    },
  ];

  return (
    <div className="mood-container">
      <h2 className="mood-title">Choose your vibe</h2>
      <p className="mood-subtitle">
        Pick one to create or join a room and start swiping.
      </p>

      <div className="mood-grid">
        {moods.map((m) => (
          <button
            key={m.key}
            className="mood-card"
            onClick={() => onSelectMood(m.key)}
          >
            
            <div className="mood-emoji">{m.emoji}</div>
            <div className="mood-label">{m.label}</div>
            <div className="mood-desc">{m.desc}</div>
            <div className="mood-preview" />
          </button>
        ))}
      </div>

      <div className="mood-footer">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
      </div>
    </div>
  );
}
