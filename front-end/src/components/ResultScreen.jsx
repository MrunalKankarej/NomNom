export default function ResultScreen({ onRestart }) {
    return (
      <div style={{ maxWidth: 700, margin: "70px auto", padding: 20, textAlign: "center" }}>
        <h2 style={{ fontSize: 40, marginBottom: 6 }}>Results</h2>
        <p style={{ marginTop: 0, color: "#444" }}>
          Your group’s top picks will appear here.
        </p>
  
        {/* Top 3 card (visual only for now) */}
        <div
          style={{
            margin: "26px auto",
            border: "1px solid #ddd",
            borderRadius: 18,
            padding: 22,
            background: "white",
            boxShadow: "0 10px 22px rgba(0,0,0,0.07)",
            maxWidth: 520,
            textAlign: "left",
          }}
        >
          <div style={{ fontSize: 16, color: "#777", marginBottom: 12 }}>
            Top picks
          </div>
  
          {/* 1st */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 10px",
              borderRadius: 12,
              border: "1px solid #eee",
              marginBottom: 10,
            }}
          >
            <div>
              <div style={{ fontSize: 18, fontWeight: 800 }}>🥇 #1 Winner</div>
              <div style={{ fontSize: 14, color: "#666" }}>
                Likes: — • Passes: —
              </div>
            </div>
            <div style={{ fontSize: 22, fontWeight: 900 }}>—%</div>
          </div>
  
          {/* 2nd */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 10px",
              borderRadius: 12,
              border: "1px solid #eee",
              marginBottom: 10,
            }}
          >
            <div>
              <div style={{ fontSize: 18, fontWeight: 800 }}>🥈 #2 Runner-up</div>
              <div style={{ fontSize: 14, color: "#666" }}>
                Likes: — • Passes: —
              </div>
            </div>
            <div style={{ fontSize: 22, fontWeight: 900 }}>—%</div>
          </div>
  
          {/* 3rd */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 10px",
              borderRadius: 12,
              border: "1px solid #eee",
            }}
          >
            <div>
              <div style={{ fontSize: 18, fontWeight: 800 }}>🥉 #3 Third place</div>
              <div style={{ fontSize: 14, color: "#666" }}>
                Likes: — • Passes: —
              </div>
            </div>
            <div style={{ fontSize: 22, fontWeight: 900 }}>—%</div>
          </div>
        </div>
  
        {/* Breakdown section (visual only) */}
        <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "left" }}>
          <div style={{ fontSize: 14, color: "#777", marginBottom: 8 }}>
            Full breakdown
          </div>
  
          {["Food A", "Food B", "Food C", "Food D"].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px 2px",
                borderBottom: "1px solid #eee",
                fontSize: 14,
              }}
            >
              <div>{label}</div>
              <div>—% (—/—)</div>
            </div>
          ))}
        </div>
  
        <div style={{ marginTop: 26 }}>
          <button onClick={onRestart} style={{ padding: "12px 18px", borderRadius: 10 }}>
            Restart
          </button>
        </div>
      </div>
    );
  }
  