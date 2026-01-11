// NomNom.jsx

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

    // reset any old room info when switching moods
    setRoomCode("");
    setUserId("");

    setScreen("room");
  }

  async function handleCreateRoom() {
  console.log("Create Room clicked. Mood:", mood);

  try {
    const created = await api("/api/rooms", {
      method: "POST",
      body: JSON.stringify({ mood }),
    });

    setRoomCode(created.roomCode);

    const joined = await api(`/api/rooms/${created.roomCode}/join`, {
      method: "POST",
    });

    setUserId(joined.userId);
  } catch (e) {
    console.error(e);
    alert("Could not create room. Make sure the backend is running.");
  }
}


  async function handleJoinRoom(code) {
    const rawInput = (code || "").trim().toUpperCase();

    // Reject anything not exactly 4 letters A–Z
    const valid = /^[A-Z]{4}$/.test(rawInput);
    if (!valid) {
      alert("Invalid code. Room codes must be EXACTLY 4 uppercase letters (A–Z).");
      return;
    }

    try {
      const joined = await api(`/api/rooms/${rawInput}/join`, { method: "POST" });

      // Optional mood check based on backend mood
      if (joined.mood && mood && joined.mood !== mood) {
        alert(`Wrong mood 😭 This room is "${joined.mood}", not "${mood}".`);
        return;
      }

      setRoomCode(rawInput);
      setUserId(joined.userId);
      setScreen("swipe");
    } catch (e) {
      console.error(e);
      alert("Room not found or backend not reachable.");
    }
  }

  function handleStartSwiping() {
    // If someone created the room, they already have roomCode and userId
    if (!roomCode || !userId) {
      alert("Please create or join a room first.");
      return;
    }
    setScreen("swipe");
  }

  function handleFinish() {
    setScreen("result");
  }

  function handleRestart() {
    setMood(null);
    setRoomCode("");
    setUserId("");
    localStorage.removeItem("roomCode");
    localStorage.removeItem("userId");
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
