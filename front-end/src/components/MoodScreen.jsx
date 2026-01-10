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
        desc: "Home Cooked Meal",
      },
    ];
  
    return (
      <div style={{ maxWidth: 900, margin: "60px auto", padding: 20 }}>
        <h2 style={{ textAlign: "center", fontSize: 36, marginBottom: 8 }}>
          Choose your vibe
        </h2>
        <p style={{ textAlign: "center", marginTop: 0, color: "#444" }}>
          Tap one to create/join a room and start swiping.
        </p>
  
        {/* 2x2 grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(220px, 1fr))",
            gap: 18,
            marginTop: 26,
          }}
        >
          {moods.map((m) => (
            <button
              key={m.key}
              onClick={() => onSelectMood(m.key)}
              style={{
                textAlign: "left",
                border: "1px solid #ddd",
                borderRadius: 16,
                padding: 18,
                cursor: "pointer",
                background: "white",
                minHeight: 150,
                boxShadow: "0 8px 18px rgba(0,0,0,0.06)",
              }}
            >
              <div style={{ fontSize: 46 }}>{m.emoji}</div>
              <div style={{ fontSize: 24, fontWeight: 700, marginTop: 8 }}>
                {m.label}
              </div>
              <div style={{ marginTop: 6, color: "#555" }}>{m.desc}</div>
  
              {/* Fake “picture block” */}
              <div
                style={{
                  marginTop: 14,
                  height: 60,
                  borderRadius: 12,
                  background:
                    "linear-gradient(135deg, rgba(255,200,200,0.9), rgba(200,220,255,0.9))",
                }}
              />
            </button>
          ))}
        </div>
  
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <button onClick={onBack} style={{ padding: "10px 14px" }}>
            Back
          </button>
        </div>
      </div>
    );
  }
  