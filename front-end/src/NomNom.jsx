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
  

  async function handleCreateRoom() {
    try {
      const { roomCode: code } = await api("/api/rooms", { method: "POST" });
      setRoomCode(code);

      const joinRes = await api(`/api/rooms/${code}/join`, { method: "POST" });
      setUserId(joinRes.userId);
    } catch (e) {
      alert("Create room failed: " + (e.message || e));
    }
  }

  async function handleJoinRoom(code) {
    try {
      const joinRes = await api(`/api/rooms/${code}/join`, { method: "POST" });
      setRoomCode(code);
      setUserId(joinRes.userId);
      setScreen("swipe");
    } catch (e) {
      alert("Join room failed: " + (e.message || e));
    }
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
