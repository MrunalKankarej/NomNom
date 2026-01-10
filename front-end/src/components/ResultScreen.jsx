export default function ResultScreen({ onRestart }) {
    return (
      <div style={{ textAlign: "center", marginTop: 80 }}>
        <h2>Results</h2>
        <p>The winner food will show here.</p>
        <button onClick={onRestart}>Restart</button>
      </div>
    );
  }
  