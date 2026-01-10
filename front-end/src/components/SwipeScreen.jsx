import { useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

// Example food lists by mood (edit whenever you want)
const FOOD_BY_MOOD = {
  lazy: [
    { id: "burger", name: "Burger 🍔" },
    { id: "pizza", name: "Pizza 🍕" },
    { id: "shawarma", name: "Shawarma 🌯" },
    { id: "tacos", name: "Tacos 🌮" },
    { id: "friedchicken", name: "Fried Chicken 🍗" },
    { id: "poutine", name: "Poutine 🍟" },
    { id: "ramen", name: "Ramen 🍜" },
  ],
  fancy: [
    { id: "steak", name: "Steak 🥩" },
    { id: "lobster", name: "Lobster 🦞" },
    { id: "sushi", name: "Sushi 🍣" },
    { id: "omakase", name: "Omakase 🎌" },
    { id: "trufflepasta", name: "Truffle Pasta 🍝" },
    { id: "tapas", name: "Tapas 🫒" },
    { id: "wagyu", name: "Wagyu 🥩" },
  ],
  classy: [
    { id: "italian", name: "Italian 🍝" },
    { id: "mediterranean", name: "Mediterranean 🥗" },
    { id: "kbbq", name: "Korean BBQ 🔥" },
    { id: "thai", name: "Thai 🍛" },
    { id: "greek", name: "Greek 🫓" },
    { id: "indian", name: "Indian 🍛" },
    { id: "brunch", name: "Brunch 🥞" },
  ],
  homie: [
    { id: "curry", name: "Home Curry 🍛" },
    { id: "lentils", name: "Lentil Stew 🥣" },
    { id: "ricebowl", name: "Rice Bowl 🍚" },
    { id: "soup", name: "Soup 🍲" },
    { id: "bbq", name: "Backyard BBQ 🍗" },
    { id: "pasta", name: "Simple Pasta 🍝" },
    { id: "sandwich", name: "Sandwich 🥪" },
  ],
};

export default function SwipeScreen({ mood, roomCode, userId, onFinish, onBack }) {
  const cardRef = useRef(null);

  // pick the list based on mood
  const foods = useMemo(() => {
    return FOOD_BY_MOOD[mood] || [];
  }, [mood]);

  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const current = foods[index];

  function goNext() {
    // reset card position for next item
    gsap.set(cardRef.current, { x: 0, rotation: 0, opacity: 1 });

    if (index + 1 >= foods.length) {
      onFinish(); // end -> results
      return;
    }
    setIndex((prev) => prev + 1);
  }

  function animateSwipe(direction) {
    if (!current) return;
    if (isAnimating) return; // prevents double-click spam

    setIsAnimating(true);

    const x = direction === "right" ? 500 : -500;
    const rot = direction === "right" ? 18 : -18;

    gsap.to(cardRef.current, {
      x,
      rotation: rot,
      opacity: 0,
      duration: 0.35,
      ease: "power2.out",
      onComplete: () => {
        setIsAnimating(false);

        // later you can call backend vote here using roomCode/userId/current.id
        // for now we just move forward
        goNext();
      },
    });
  }

  function handleLike() {
    animateSwipe("right");
  }

  function handlePass() {
    animateSwipe("left");
  }

  if (!current) {
    return (
      <div style={{ textAlign: "center", marginTop: 80 }}>
        <h2>Swipe your food</h2>
        <p>No foods for this mood yet.</p>
        <button onClick={onBack}>Back</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: 60 }}>
      <h1 style={{ fontSize: 48, marginBottom: 10 }}>Swipe your food</h1>
      <p style={{ fontSize: 22, marginTop: 0 }}>
        Mood: <strong>{mood}</strong>
      </p>

      {/* THE CARD THAT SWIPES */}
      <div
        ref={cardRef}
        style={{
          maxWidth: 720,
          margin: "60px auto 40px",
          padding: "70px 40px",
          borderRadius: 30,
          background: "white",
          border: "1px solid #e9e9e9",
          boxShadow: "0 24px 60px rgba(0,0,0,0.08)",
          fontSize: 54,
          fontWeight: 700,
        }}
      >
        {current.name}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 18 }}>
        <button
          onClick={handlePass}
          disabled={isAnimating}
          style={{ padding: "14px 30px", fontSize: 18, cursor: "pointer" }}
        >
          ❌ Pass
        </button>

        <button
          onClick={handleLike}
          disabled={isAnimating}
          style={{ padding: "14px 30px", fontSize: 18, cursor: "pointer" }}
        >
          ❤️ Like
        </button>
      </div>

      <div style={{ marginTop: 28 }}>
        <button onClick={onBack} style={{ marginRight: 12 }}>
          Back
        </button>
        <button onClick={onFinish}>Finish Early</button>
      </div>
    </div>
  );
}
