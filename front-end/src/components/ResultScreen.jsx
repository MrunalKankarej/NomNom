import { useEffect, useState } from "react";
import { api } from "../api";
import "./ResultScreen.css";

export default function ResultScreen({ roomCode, onRestart }) {
  const [loading, setLoading] = useState(true);
  const [winner, setWinner] = useState(null);
  const [breakdown, setBreakdown] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadResults() {
      try {
        setLoading(true);
        setError("");

        const data = await api(`/api/rooms/${roomCode}/results`);
        setWinner(data.winnerFood);
        setBreakdown(data.breakdown || []);
      } catch (e) {
        console.error(e);
        setError(
          "Could not load results. Make sure backend is running and room exists."
        );
      } finally {
        setLoading(false);
      }
    }

    if (roomCode) loadResults();
  }, [roomCode]);

  return (
    <div className="result-container">
      <h1 className="result-title">Results</h1>
      <p className="result-subtitle">
        Room: <strong>{roomCode}</strong>
      </p>

      {loading && <p>Loading results...</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {!loading && !error && (
        <>
          {/* WINNER CARD */}
          <div className="result-top-cards">
            <div className="result-card">
              <div>
                <div className="result-card-label">🥇 Winner</div>
                {winner ? (
                  <div className="result-card-stats">
                    Likes: <strong>{winner.likes}</strong> • Passes:{" "}
                    <strong>{winner.passes}</strong>
                  </div>
                ) : (
                  <div className="result-card-stats">
                    No winner yet. Try swiping first.
                  </div>
                )}
              </div>

              {winner && (
                <div className="result-card-percent">
                  {winner.foodId}
                </div>
              )}
            </div>
          </div>

          {/* BREAKDOWN */}
          <div className="result-breakdown">
            <div className="breakdown-title">Full breakdown</div>

            {breakdown.length === 0 ? (
              <p>No votes yet.</p>
            ) : (
              breakdown
                .slice()
                .sort((a, b) => b.likes - a.likes)
                .map((item) => (
                  <div key={item.foodId} className="breakdown-row">
                    <div>{item.foodId}</div>
                    <div>
                      {item.likes} 👍 / {item.passes} 👎
                    </div>
                  </div>
                ))
            )}
          </div>

          {/* FOOTER */}
          <div className="result-footer">
            <button className="btn-restart" onClick={onRestart}>
              Restart
            </button>
          </div>
        </>
      )}
    </div>
  );
}
