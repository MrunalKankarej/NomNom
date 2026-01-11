import "./ResultScreen.css";

export default function ResultScreen({ onRestart }) {
  const topFoods = [
    { emoji: "🥇", label: "#1 Winner" },
    { emoji: "🥈", label: "#2 Runner-up" },
    { emoji: "🥉", label: "#3 Third place" },
  ];

  const breakdownFoods = ["Food A", "Food B", "Food C", "Food D"];

  return (
    <div className="result-container">
      <h2 className="result-title">Results</h2>
      <p className="result-subtitle">
        Your group’s top picks will appear here.
      </p>

      <div className="result-top-cards">
        {topFoods.map((f, idx) => (
          <div key={idx} className="result-card">
            <div>
              <div className="result-card-label">
                {f.emoji} {f.label}
              </div>
              <div className="result-card-stats">
                Likes: — • Passes: —
              </div>
            </div>
            <div className="result-card-percent">—%</div>
          </div>
        ))}
      </div>

      <div className="result-breakdown">
        <div className="breakdown-title">Full breakdown</div>
        {breakdownFoods.map((label) => (
          <div key={label} className="breakdown-row">
            <div>{label}</div>
            <div>—% (—/—)</div>
          </div>
        ))}
      </div>

      <div className="result-footer">
        <button className="btn-restart" onClick={onRestart}>
          Restart
        </button>
      </div>
    </div>
  );
}
