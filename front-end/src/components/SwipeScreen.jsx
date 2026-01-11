import { useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
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

export default function SwipeScreen({ mood, roomCode, userId, onFinish, onBack }) {
  const cardRef = useRef(null);

  const foods = useMemo(() => FOOD_BY_MOOD[mood] || [], [mood]);
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const current = foods[index];

  function goNext() {
    gsap.set(cardRef.current, { x: 0, rotation: 0, opacity: 1 });
    if (index + 1 >= foods.length) return onFinish();
    setIndex(prev => prev + 1);
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
      onComplete: () => {
        setIsAnimating(false);
        goNext();
      },
    });
  }

  return (
    <div className="swipe-screen">
      <h1 className="swipe-title">Swipe your food</h1>
      <p className="swipe-subtitle">
        Mood: <strong>{mood}</strong>
      </p>

      {current && (
        <div ref={cardRef} className="swipe-card">
          {current.name}
        </div>
      )}

      <div className="swipe-actions">
        <button className="btn-pass" onClick={() => animateSwipe("left")} disabled={isAnimating}>
          ❌ Pass
        </button>
        <button className="btn-like" onClick={() => animateSwipe("right")} disabled={isAnimating}>
          ❤️ Like
        </button>
      </div>

      <div className="swipe-footer">
        <button className="btn-back" onClick={onBack}>
          ← Back
        </button>
        <button className="btn-finish" onClick={onFinish}>
          Finish Early
        </button>
      </div>
    </div>
  );
}
