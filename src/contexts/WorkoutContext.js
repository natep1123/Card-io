"use client";

import { createContext, useContext, useState, useEffect } from "react";

const WorkoutContext = createContext();

export function WorkoutProvider({ children }) {
  const [exercises, setExercises] = useState(null);
  const [deckSize, setDeckSize] = useState("full");
  const [deck, setDeck] = useState({
    deckId: null,
    cards: [],
    remaining: null,
  });
  const [wState, setWState] = useState("form");
  const [wStats, setWStats] = useState({});
  const [isDeckFull, setIsDeckFull] = useState(true);
  const [drawnCards, setDrawnCards] = useState([]);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [clockStart, setClockStart] = useState(null);

  // Utility to sync to sessionStorage
  const saveToStorage = (key, value) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  };

  // Utility to load from sessionStorage with a fallback
  const loadFromStorage = (key, fallback) => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem(key);
      return stored ? JSON.parse(stored) : fallback;
    }
    return fallback;
  };

  // Load state from sessionStorage on mount
  useEffect(() => {
    const storedDeck = loadFromStorage("deck", deck);
    const storedExercises = loadFromStorage("exercises", exercises);
    const storedWStats = loadFromStorage("wStats", {});
    const storedDrawnCards = loadFromStorage("drawnCards", []);
    const storedCurrentExercise = loadFromStorage("currentExercise", null);
    const storedClockStart = loadFromStorage("clockStart", null);
    const storedWState = loadFromStorage("wState", "form");
    const storedDeckSize = loadFromStorage("deckSize", "full");
    const storedIsDeckFull = loadFromStorage("isDeckFull", true);

    setDeck(storedDeck);
    setExercises(storedExercises);
    setWStats(storedWStats);
    setDrawnCards(storedDrawnCards);
    setCurrentExercise(storedCurrentExercise);
    setClockStart(storedClockStart);
    setWState(storedWState);
    setDeckSize(storedDeckSize);
    setIsDeckFull(storedIsDeckFull);
  }, []);

  // Sync each piece of state to sessionStorage
  useEffect(() => {
    saveToStorage("deck", deck);
  }, [deck]);

  useEffect(() => {
    saveToStorage("exercises", exercises);
  }, [exercises]);

  useEffect(() => {
    saveToStorage("wStats", wStats);
  }, [wStats]);

  useEffect(() => {
    saveToStorage("drawnCards", drawnCards);
  }, [drawnCards]);

  useEffect(() => {
    saveToStorage("currentExercise", currentExercise);
  }, [currentExercise]);

  useEffect(() => {
    saveToStorage("clockStart", clockStart);
  }, [clockStart]);

  useEffect(() => {
    saveToStorage("wState", wState);
  }, [wState]);

  useEffect(() => {
    saveToStorage("deckSize", deckSize);
  }, [deckSize]);

  useEffect(() => {
    saveToStorage("isDeckFull", isDeckFull);
  }, [isDeckFull]);

  // Utility to format clock (like 0:45:26)
  const formatClock = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Function to reset the workout state
  const resetWorkout = () => {
    setDeck({
      deckId: null,
      cards: [],
      remaining: null,
    });
    setDeckSize("full");
    setWStats({});
    setWState("form");
    setIsDeckFull(true);
    setDrawnCards([]);
    setCurrentExercise(null);
    setClockStart(null);
    sessionStorage.clear();
  };

  return (
    <WorkoutContext.Provider
      value={{
        deck,
        setDeck,
        exercises,
        setExercises,
        wState,
        setWState,
        deckSize,
        setDeckSize,
        wStats,
        setWStats,
        resetWorkout,
        isDeckFull,
        setIsDeckFull,
        drawnCards,
        setDrawnCards,
        currentExercise,
        setCurrentExercise,
        clockStart,
        setClockStart,
        formatClock,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkoutContext() {
  return useContext(WorkoutContext);
}
