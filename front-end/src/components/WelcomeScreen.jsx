import BounceCards from "./BounceCards";

import burger from "../assets/burger.jpg";
import hotpot from "../assets/hotpot.jpg";
import indian from "../assets/indian.jpg";
import italian from "../assets/italian.jpg";
import lebanese from "../assets/lebanese.webp";
import mexican from "../assets/mexican.jpg";
import ramen from "../assets/ramen.jpg";
import sushi from "../assets/sushi.jpg";

export default function WelcomeScreen({ onStart }) {
  return (
    <div style={{ textAlign: "center", marginTop: 40, padding: 20 }}>
      {/* Top image banner ONLY on welcome */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 30 }}>
        <BounceCards
          images={[italian, sushi, mexican, hotpot, indian, lebanese, burger, ramen]}
          containerWidth={1000}
          containerHeight={500}
        />
      </div>

      <h1 style={{ fontSize: 60, margin: 0 }}>NomNom</h1>
      <p style={{ fontSize: 22, marginTop: 10 }}>
        Welcome! Pick a mood, make a room code, and swipe with friends.
      </p>

      <button
        onClick={onStart}
        style={{
          marginTop: 18,
          padding: "12px 18px",
          borderRadius: 10,
          cursor: "pointer",
          fontSize: 16,
        }}
      >
        Get Started
      </button>
    </div>
  );
}
