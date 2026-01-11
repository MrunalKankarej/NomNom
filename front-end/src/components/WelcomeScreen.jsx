import BounceCards from "./BounceCards";
import './WelcomeScreen.css';
import burger from "../assets/burger.jpg";
import hotpot from "../assets/hotpot.jpg";
import indian from "../assets/indian.jpg";
import italian from "../assets/italian.jpg";
import lebanese from "../assets/lebanese.webp";
import mexican from "../assets/mexican.jpg";
import ramen from "../assets/ramen.jpg";
import sushi from "../assets/sushi.jpg";

export default function WelcomeScreen({ onStart }) {
  const images = [italian, sushi, mexican, hotpot, indian, lebanese, burger, ramen];

  return (
    <div className="welcome-container">
      <div className="image-banner">
        <BounceCards
          images={images}
          containerWidth={1000}
          containerHeight={500}
        />
      </div>

      <h1 className="app-title">NomNom</h1>
      <p className="tagline">
        Welcome! Pick a mood, make a room code, and swipe with friends.
      </p>

      <button className="cta-button" onClick={onStart}>
        Get Started
      </button>
    </div>
  );
}
