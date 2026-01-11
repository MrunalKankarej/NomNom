import './RoomScreen.css';

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
    onJoinRoom(code.trim());
  }

  function copyCode() {
    if (!roomCode) return;
    navigator.clipboard.writeText(roomCode);
    alert("Copied code: " + roomCode);
  }

  return (
    <div className="room-container">
      <h2 className="room-title">Room</h2>
      <p className="room-subtitle">
        Selected mood: <strong>{mood}</strong>
      </p>

      <div className="room-buttons">
        <button className="primary-btn" onClick={onCreateRoom}>
          Create Room
        </button>
        <button className="secondary-btn" onClick={handleJoinClick}>
          Join Room
        </button>
      </div>

      {roomCode && (
        <div className="room-code-card">
          <div className="room-code-label">Your room code:</div>
          <div className="room-code">{roomCode}</div>

          <button className="secondary-btn" onClick={copyCode}>
            Copy Code
          </button>

          <div style={{ marginTop: 16 }}>
            <button className="primary-btn" onClick={onStartSwiping}>
              Start Swiping
            </button>
          </div>
        </div>
      )}

      <div className="room-back">
        <button className="secondary-btn" onClick={onBack}>
          ← Back
        </button>
      </div>
    </div>
  );
}
