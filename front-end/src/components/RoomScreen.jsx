export default function RoomScreen({
    mood,
    roomCode,
    onCreateRoom,
    onJoinRoom,
    onStartSwiping,
    onBack,
  }) {
    function handleJoinClick() {
      const code = prompt("Enter room code (4 letters):");
      if (!code) return;
      onJoinRoom(code.toUpperCase().trim());
    }
  
    function copyCode() {
      if (!roomCode) return;
      navigator.clipboard.writeText(roomCode);
      alert("Copied code: " + roomCode);
    }
  
    return (
      <div style={{ maxWidth: 700, margin: "70px auto", padding: 20, textAlign: "center" }}>
        <h2 style={{ fontSize: 36, marginBottom: 8 }}>Room</h2>
        <p style={{ marginTop: 0, color: "#444" }}>
          Selected mood: <strong>{mood}</strong>
        </p>
  
        <div style={{ marginTop: 30 }}>
          <button
            onClick={onCreateRoom}
            style={{
              padding: "12px 18px",
              borderRadius: 10,
              cursor: "pointer",
              fontSize: 16,
              marginRight: 12,
            }}
          >
            Create Room
          </button>
  
          <button
            onClick={handleJoinClick}
            style={{
              padding: "12px 18px",
              borderRadius: 10,
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            Join Room
          </button>
        </div>
  
        {roomCode && (
          <div
            style={{
              marginTop: 30,
              border: "1px solid #ddd",
              borderRadius: 16,
              padding: 20,
              background: "white",
              boxShadow: "0 8px 18px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontSize: 14, color: "#666" }}>Your room code:</div>
            <div style={{ fontSize: 48, fontWeight: 800, letterSpacing: 6, margin: "10px 0" }}>
              {roomCode}
            </div>
  
            <button onClick={copyCode} style={{ padding: "10px 14px", borderRadius: 10 }}>
              Copy Code
            </button>
  
            <div style={{ marginTop: 16 }}>
              <button
                onClick={onStartSwiping}
                style={{
                  padding: "12px 18px",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontSize: 16,
                }}
              >
                Start Swiping
              </button>
            </div>
          </div>
        )}
  
        <div style={{ marginTop: 24 }}>
          <button onClick={onBack} style={{ padding: "10px 14px" }}>
            Back
          </button>
        </div>
      </div>
    );
  }
  