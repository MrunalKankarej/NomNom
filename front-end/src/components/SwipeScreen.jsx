import { useState } from "react";

export default function SwipeScreen({ mood, onFinish, onBack }) {
  // Foods grouped by mood
  const foodByMood = {
    lazy: [
      { id: "burger", name: "Burger 🍔" },
      { id: "pizza", name: "Pizza 🍕" },
      { id: "fries", name: "Fries 🍟" },
      { id: "shawarma", name: "Shawarma 🌯" },
      { id: "tacos", name: "Tacos 🌮" },
    ],
    fancy: [
      { id: "steak", name: "Steak 🥩" },
      { id: "lobster", name: "Lobster 🦞" },
      { id: "sushi", name: "Sushi 🍣" },
      { id: "pasta", name: "Truffle Pasta 🍝" },
      { id: "wine", name: "Wine & Cheese 🍷🧀" },
    ],
    classy: [
      { id: "salmon", name: "Grilled Salmon 🐟" },
      { id: "risotto", name: "Risotto 🍚" },
      { id: "duck", name: "Duck Confit 🍗" },
      { id: "charcuterie", name: "Charcuterie 🧀" },
      { id: "brunch", name: "Fancy Brunch 🥐" },
    ],
    homie: [
      { id: "curry", name: "Homemade Curry 🍛" },
      { id: "pasta", name: "Home Pasta 🍝" },
      { id: "soup", name: "Comfort Soup 🍲" },
      { id: "stew", name: "Stew 🥘" },
      { id: "rice", name: "Rice Bowl 🍚" },
    ],
  };

  // Pick foods based on mood (fallback = lazy)
  const foods = foodByMood[mood] || foodByMood.lazy;

  const [index, setIndex] = useState(0);
  const [likes, setLikes] = useState([]);

  const currentFood = foods[index];

  function handleLike() {
    setLikes([...likes, currentFood]);
    next();
  }

  function handlePass() {
    next();
  }

  function next() {
    if (index + 1 >= foods.length) {
      console.log("LIKED FOODS:", likes);
      onFinish();
    } else {
      setIndex(index + 1);
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: 80 }}>
      <h2>Swipe your food</h2>
      <p>Mood: <strong>{mood}</strong></p>

      <div
        style={{
          margin: "40px auto",
          padding: 40,
          maxWidth: 400,
          borderRadius: 20,
          border: "1px solid #ddd",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          fontSize: 28,
        }}
      >
        {currentFood.name}
      </div>

      <div>
        <button
          onClick={handlePass}
          style={{ padding: "12px 20px", marginRight: 10 }}
        >
          ❌ Pass
        </button>

        <button
          onClick={handleLike}
          style={{ padding: "12px 20px" }}
        >
          ❤️ Like
        </button>
      </div>

      <div style={{ marginTop: 30 }}>
        <button onClick={onBack} style={{ marginRight: 10 }}>
          Back
        </button>
        <button onClick={onFinish}>
          Finish Early
        </button>
      </div>
    </div>
  );
}
