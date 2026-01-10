import { useEffect, useState } from "react";
import { api } from "./api";

import WelcomeScreen from "./components/WelcomeScreen";
import MoodScreen from "./components/MoodScreen";
import RoomScreen from "./components/RoomScreen";
import SwipeScreen from "./components/SwipeScreen";
import ResultScreen from "./components/ResultScreen";

export default function NomNom() {
  // welcome -> mood -> room -> swipe -> result
  const [screen, setScreen] = useState("welcome");
  const [mood, setMood] = useState(null);

  const [roomCode, setRoomCode] = useState(localStorage.getItem("roomCode") || "");
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");

  useEffect(() => {
    if (roomCode) localStorage.setItem("roomCode", roomCode);
    if (userId) localStorage.setItem("userId", userId);
  }, [roomCode, userId]);

  function handleStart() {
    setScreen("mood");
  }

  function handleSelectMood(selectedMood) {
    setMood(selectedMood);
  
    // resets old room info when switching moods
    setRoomCode("");
  
    setScreen("room");
  }
  

  function handleCreateRoom() {
    //  ONLY uppercase letters (NO numbers)
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let code = "";
  
    for (let i = 0; i < 4; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
  
    setRoomCode(code);
  
    // Save mood for this code
    const raw = localStorage.getItem("nomnom_roomMoodMap");
    const map = raw ? JSON.parse(raw) : {};
    map[code] = mood;
    localStorage.setItem("nomnom_roomMoodMap", JSON.stringify(map));
  }
  
  
  function handleJoinRoom(code) {
    const rawInput = (code || "").trim();
  
    //  Reject lowercase
    if (rawInput !== rawInput.toUpperCase()) {
      alert("Invalid code. Use ALL CAPS letters only.");
      return;
    }
  
    //  Reject anything that is NOT exactly 4 letters A–Z
    const valid = /^[A-Z]{4}$/.test(rawInput);
    if (!valid) {
      alert("Invalid code. Room codes must be EXACTLY 4 uppercase letters (A–Z). No numbers.");
      return;
    }
  
    //  Check if this code exists
    const raw = localStorage.getItem("nomnom_roomMoodMap");
    const map = raw ? JSON.parse(raw) : {};
    const codeMood = map[rawInput];
  
    if (!codeMood) {
      alert("Code not found. Ask the host to share the correct code.");
      return;
    }
  
    //  Reject if wrong mood
    if (codeMood !== mood) {
      alert(`Wrong mood 😭 This code belongs to "${codeMood}", not "${mood}".`);
      return;
    }
  
    //  Valid join
    setRoomCode(rawInput);
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
<<<<<<< HEAD
    localStorage.removeItem("nomnom_roomMoodMap");
=======
    setUserId("");
    localStorage.removeItem("roomCode");
    localStorage.removeItem("userId");
>>>>>>> dbcb6a355214200a0b3dd18f8765442ff1c89dc2
    setScreen("welcome");
  }

  if (screen === "welcome") return <WelcomeScreen onStart={handleStart} />;

  if (screen === "mood")
    return <MoodScreen onSelectMood={handleSelectMood} onBack={handleRestart} />;

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

  return <ResultScreen roomCode={roomCode} onRestart={handleRestart} />;
}
