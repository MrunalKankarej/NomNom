import { useState } from "react";
import "./App.css";

import BounceCards from "./components/BounceCards";

import burger from "./assets/burger.jpg";
import hotpot from "./assets/hotpot.jpg";
import indian from "./assets/indian.jpg";
import italian from "./assets/italian.jpg";
import lebanese from "./assets/lebanese.webp";
import mexican from "./assets/mexican.jpg";
import ramen from "./assets/ramen.jpg";
import sushi from "./assets/sushi.jpg";


function App() {
  const [screen, setScreen] = useState("start");
  const [mood, setMood] = useState(null);

  function handleMoodClick(selectedMood) {
    console.log("Mood selected:", selectedMood);
    setMood(selectedMood);
    setScreen("swipe");
  }

  return (
    <div>

            <BounceCards
  images={[italian, sushi, mexican, hotpot, indian, lebanese, burger, ramen]}
  containerWidth={1000}
  containerHeight={500}
/>

      {/* START SCREEN */}
      {screen === "start" && (
        <div>
          <h1> NomNom</h1>
          <p>What is your mood?</p>

          <button onClick={() => handleMoodClick("lazy")}>Lazy</button>
          <button onClick={() => handleMoodClick("healthy")}>Healthy</button>
          <button onClick={() => handleMoodClick("fancy")}>Fancy</button>
          <button onClick={() => handleMoodClick("broke")}>Broke</button>
          <button onClick={() => handleMoodClick("adventurous")}>
            Adventurous
          </button>
        </div>
      )}


      {/* SWIPE SCREEN */}
      {screen === "swipe" && (
        <div>
          <h2>Swipe your food</h2>
          <p>This is where food cards will go</p>

          <button>❌ Pass</button>
          <button>❤️ Like</button>
        </div>
      )}

      {/* RESULT SCREEN */}
      {screen === "result" && (
        <div>
          <h2>Your Match</h2>
          <p>This is where results will appear</p>

          <button onClick={() => setScreen("start")}>Restart</button>
        </div>
      )}
    </div>
  );
}

export default App;
