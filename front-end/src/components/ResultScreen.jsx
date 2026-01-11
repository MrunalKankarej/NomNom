import { useEffect, useState } from "react";
import { api } from "../api";

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
        setError("Could not load results. Make sure backend is running and room exists.");
      } finally {
        setLoading(false);
      }
    }

    if (roomCode) loadResults();
  }, [roomCode]);

  return (
    <div style={{ textAlign: "center", marginTop: 70 }}>
      <h1 style={{ fontSize: 48, marginBottom: 10 }}>Results</h1>
      <p style={{ fontSize: 18, marginTop: 0 }}>
        Room: <strong>{roomCode}</strong>
      </p>

      {loading && <p>Loading results...</p>}

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {!loading && !error && (
        <>
          <div
            style={{
              maxWidth: 720,
              margin: "30px auto",
              padding: "30px 24px",
              borderRadius: 20,
              background: "white",
              border: "1px solid #e9e9e9",
              boxShadow: "0 18px 40px rgba(0,0,0,0.08)",
            }}
          >
            <h2 style={{ marginTop: 0 }}>Winner</h2>

            {winner ? (
              <>
                <div style={{ fontSize: 44, fontWeight: 800, marginTop: 10 }}>
                  {winner.foodId}
                </div>
                <div style={{ marginTop: 8, color: "#444" }}>
                  Likes: <strong>{winner.likes}</strong> | Passes:{" "}
                  <strong>{winner.passes}</strong>
                </div>
              </>
            ) : (
              <p>No winner yet. Try swiping first.</p>
            )}
          </div>

          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "left" }}>
            <h3>Breakdown</h3>
            {breakdown.length === 0 ? (
              <p>No votes yet.</p>
            ) : (
              <ul>
                {breakdown
                  .slice()
                  .sort((a, b) => b.likes - a.likes)
                  .map((item) => (
                    <li key={item.foodId} style={{ marginBottom: 8 }}>
                      <strong>{item.foodId}</strong>: {item.likes} likes,{" "}
                      {item.passes} passes
                    </li>
                  ))}
              </ul>
            )}
          </div>

          <button onClick={onRestart} style={{ marginTop: 24, padding: "12px 18px" }}>
            Restart
          </button>
        </>
      )}
    </div>
  );
}
