import React from "react";
import { useSwipeable } from "react-swipeable";

export default function SwipableCard({ image, onSwipe, style }) {
  const handlers = useSwipeable({
    onSwipedLeft: () => onSwipe(false),  // pass
    onSwipedRight: () => onSwipe(true),  // like
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,  // allows mouse drag
  });

  return (
    <div
      {...handlers}
      style={{
        position: "absolute",
        width: "200px",
        height: "200px",
        borderRadius: "25px",
        overflow: "hidden",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        cursor: "grab",
        backgroundColor: "#fff",
        ...style,
      }}
    >
      <img
        src={image}
        alt="food"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
}
