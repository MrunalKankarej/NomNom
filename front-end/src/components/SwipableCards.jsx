import { useRef } from "react";
import { gsap } from "gsap";

export default function SwipableCards({ image, onLike, onPass }) {
  const cardRef = useRef(null);

  function swipeRight() {
    gsap.to(cardRef.current, {
      x: 500,
      rotation: 20,
      opacity: 0,
      duration: 0.4,
      onComplete: onLike,
    });
  }

  function swipeLeft() {
    gsap.to(cardRef.current, {
      x: -500,
      rotation: -20,
      opacity: 0,
      duration: 0.4,
      onComplete: onPass,
    });
  }

  return (
    <div style={{ textAlign: "center" }}>
      <div
        ref={cardRef}
        style={{
          width: 320,
          height: 420,
          margin: "0 auto",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          background: "#fff",
        }}
      >
        <img
          src={image}
          alt="food"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <button
          onClick={swipeLeft}
          style={{ marginRight: 20, fontSize: 20 }}
        >
          ❌ Pass
        </button>

        <button onClick={swipeRight} style={{ fontSize: 20 }}>
          ❤️ Like
        </button>
      </div>
    </div>
  );
      }

