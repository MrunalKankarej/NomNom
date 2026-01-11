// SwipeScreen.jsx

import { useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { api } from "../api";
import "./SwipeScreen.css";

// Example food lists by mood
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

export default function SwipeScreen({
  mood,
  roomCode,
  userId,
  onFinish,
  onBack,
}) {
  const cardRef = useRef(null);

  const foods = useMemo(() => FOOD_BY_MOOD[mood] || [], [mood]);

  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const current = foods[index];

  function goNext() {
    if (cardRef.current) {
      gsap.set(cardRef.current, { x: 0, rotation: 0, opacity: 1 });
    }

    if (index + 1 >= foods.length) {
      onFinish();
      return;
    }
    setIndex((prev) => prev + 1);
  }

  async function sendVote(direction) {
    if (!roomCode || !userId || !current) return;

    const vote = direction === "right" ? "like" : "pass";

    try {
      await api(`/api/rooms/${roomCode}/vote`, {
        method: "POST",
        body: JSON.stringify({
          userId,
          foodId: current.id,
          vote,
        }),
      });
      setErrorMsg("");
    } catch {
      setErrorMsg("Vote failed. Check backend connection.");
    }
  }

  function animateSwipe(direction) {
    if (!current || isAnimating) return;

    setIsAnimating(true);

    const x = direction === "right" ? 500 : -500;
    const rot = direction === "right" ? 18 : -18;

    gsap.to(cardRef.current, {
      x,
      rotation: rot,
      opacity: 0,
      duration: 0.35,
      ease: "power2.out",
      onComplete: async () => {
        setIsAnimating(false);
        await sendVote(direction);
        goNext();
      },
    });
  }

  if (!current) {
    return (
      <div className="swipe-container">
        <h2 className="swipe-title">Swipe your food</h2>
        <p className="swipe-subtitle">No foods for this mood yet.</p>
        <button onClick={onBack}>Back</button>
      </div>
    );
  }

  return (
    <div className="swipe-container">
      <h1 className="swipe-title">Swipe your food</h1>
      <p className="swipe-subtitle">
        Mood: <strong>{mood}</strong>
      </p>
      <p className="swipe-room">
        Room: <strong>{roomCode}</strong>
      </p>

      {errorMsg && <div className="swipe-error">{errorMsg}</div>}

      <div ref={cardRef} className="swipe-card">
        {current.name}
      </div>

      <div className="swipe-buttons">
        <button
          className="btn-pass"
          onClick={() => animateSwipe("left")}
          disabled={isAnimating}
        >
          ❌ Pass
        </button>

        <button
          className="btn-like"
          onClick={() => animateSwipe("right")}
          disabled={isAnimating}
        >
          ❤️ Like
        </button>
      </div>

      <div className="swipe-footer">
        <button onClick={onBack}>Back</button>
        <button onClick={onFinish}>Finish Early</button>
      </div>
    </div>
  );
}
