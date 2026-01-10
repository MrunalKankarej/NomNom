import { useState } from "react";

import WelcomeScreen from "./components/WelcomeScreen";
import MoodScreen from "./components/MoodScreen";
import RoomScreen from "./components/RoomScreen";
import SwipeScreen from "./components/SwipeScreen";
import ResultScreen from "./components/ResultScreen";

export default function NomNom() {
  // welcome -> mood -> room -> swipe -> result
  const [screen, setScreen] = useState("welcome");
  const [mood, setMood] = useState(null);
  const [roomCode, setRoomCode] = useState("");
  const [userId] = useState(() => "u" + Math.random().toString(16).slice(2, 8));

  function handleStart() {
    setScreen("mood");
  }

  function handleSelectMood(selectedMood) {
    setMood(selectedMood);
    setScreen("room");
  }

  function handleCreateRoom() {
    // TEMP fake code (backend will replace this later)
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
    setRoomCode(code);
  }

  function handleJoinRoom(code) {
    setRoomCode(code);
    setScreen("swipe");
  }

  function handleStartSwiping() {
    setScreen("swipe");
  }

  function handleFinish() {
    setScreen("result");
  }

  function handleRestart() {
    setMood(null);
    setRoomCode("");
    setScreen("welcome");
  }

  if (screen === "welcome") return <WelcomeScreen onStart={handleStart} />;
  if (screen === "mood") return <MoodScreen onSelectMood={handleSelectMood} onBack={handleRestart} />;
  if (screen === "room")
    return (
      <RoomScreen
        mood={mood}
        roomCode={roomCode}
        onCreateRoom={handleCreateRoom}
        onJoinRoom={handleJoinRoom}
        onStartSwiping={handleStartSwiping}
        onBack={() => setScreen("mood")}
      />
    );
  if (screen === "swipe")
    return (
      <SwipeScreen
        mood={mood}
        roomCode={roomCode}
        userId={userId}
        onFinish={handleFinish}
        onBack={() => setScreen("room")}
      />
    );

  return <ResultScreen onRestart={handleRestart} />;
}

