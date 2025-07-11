"use client";

import { createContext, useContext, useState, useEffect } from "react";

const WorkoutContext = createContext({
  deck: null,
  setDeck: () => {},
  exercises: null,
  setExercises: () => {},
  wState: "form",
  setWState: () => {},
  deckSize: "full",
  setDeckSize: () => {},
  wStats: {},
  setWStats: () => {},
  wTotals: {},
  setWTotals: () => {},
  resetWorkout: () => {},
  isDeckFull: true,
  setIsDeckFull: () => {},
  drawnCards: [],
  setDrawnCards: () => {},
  currentExercise: null,
  setCurrentExercise: () => {},
  clockStart: null,
  setClockStart: () => {},
  finalTime: null,
  setFinalTime: () => {},
  formatClock: (seconds) => "",
  multiplier: 1,
  setMultiplier: () => {},
  skippedCounter: 0,
  setSkippedCounter: () => {},
  tapOut: false,
  setTapOut: () => {},
  isSaved: false,
  setIsSaved: () => {},
  insights: null,
  setInsights: () => {},
  insightsData: null,
  setInsightsData: () => {},
});

export function WorkoutProvider({ children }) {
  const [exercises, setExercises] = useState(null);
  const [deckSize, setDeckSize] = useState("full");
  const [deck, setDeck] = useState({
    deckId: null,
    cards: [],
    remaining: null,
  });
  const [wState, setWState] = useState("form"); // Top-level state for Workout comp (form --> display --> summary)
  const [wStats, setWStats] = useState({}); // Tracking active completed reps per exercises
  const [wTotals, setWTotals] = useState({}); // Tracking broader stats, like percent completion by group
  const [isDeckFull, setIsDeckFull] = useState(true); // Track if deck is full or not
  const [drawnCards, setDrawnCards] = useState([]); // Array of drawn cards from the deck
  const [currentExercise, setCurrentExercise] = useState(null); // Current exercise the user has drawn
  const [clockStart, setClockStart] = useState(null); // Timestamp for dynamic time tracking
  const [finalTime, setFinalTime] = useState(null); // Final time of the completed workout
  const [multiplier, setMultiplier] = useState(1); // Tracking multiplier of the workout
  const [skippedCounter, setSkippedCounter] = useState(0); // Tracking count of skipped cards
  const [tapOut, setTapOut] = useState(false); // Tracking if the user has tapped out of the workout
  const [isSaved, setIsSaved] = useState(false); // Tracking if the current workout is saved
  const [insights, setInsights] = useState(null); // AI-generated insights
  const [insightsData, setInsightsData] = useState(null); // Data used to generate insights

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
    const storedWTotals = loadFromStorage("wTotals", {});
    const storedDrawnCards = loadFromStorage("drawnCards", []);
    const storedCurrentExercise = loadFromStorage("currentExercise", null);
    const storedClockStart = loadFromStorage("clockStart", null);
    const storedFinalTime = loadFromStorage("finalTime", null);
    const storedWState = loadFromStorage("wState", "form");
    const storedDeckSize = loadFromStorage("deckSize", "full");
    const storedIsDeckFull = loadFromStorage("isDeckFull", true);
    const storedMultiplier = loadFromStorage("multiplier", 1);
    const storedSkippedCounter = loadFromStorage("skippedCounter", 0);
    const storedTapOut = loadFromStorage("tapOut", false);
    const storedIsSaved = loadFromStorage("isSaved", false);
    const storedInsights = loadFromStorage("insights", null);
    const storedInsightsData = loadFromStorage("insightsData", null);

    setDeck(storedDeck);
    setExercises(storedExercises);
    setWStats(storedWStats);
    setWTotals(storedWTotals);
    setDrawnCards(storedDrawnCards);
    setCurrentExercise(storedCurrentExercise);
    setClockStart(storedClockStart);
    setFinalTime(storedFinalTime);
    setWState(storedWState);
    setDeckSize(storedDeckSize);
    setIsDeckFull(storedIsDeckFull);
    setMultiplier(storedMultiplier);
    setSkippedCounter(storedSkippedCounter);
    setTapOut(storedTapOut);
    setIsSaved(storedIsSaved);
    setInsights(storedInsights);
    setInsightsData(storedInsightsData);
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
    saveToStorage("wTotals", wTotals);
  }, [wTotals]);

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
    saveToStorage("finalTime", finalTime);
  }, [finalTime]);

  useEffect(() => {
    saveToStorage("wState", wState);
  }, [wState]);

  useEffect(() => {
    saveToStorage("deckSize", deckSize);
  }, [deckSize]);

  useEffect(() => {
    saveToStorage("isDeckFull", isDeckFull);
  }, [isDeckFull]);

  useEffect(() => {
    saveToStorage("multiplier", multiplier);
  }, [multiplier]);

  useEffect(() => {
    saveToStorage("skippedCounter", skippedCounter);
  }, [skippedCounter]);

  useEffect(() => {
    saveToStorage("tapOut", tapOut);
  }, [tapOut]);

  useEffect(() => {
    saveToStorage("isSaved", isSaved);
  }, [isSaved]);

  useEffect(() => {
    saveToStorage("insights", insights);
  }, [insights]);

  useEffect(() => {
    saveToStorage("insightsData", insightsData);
  }, [insightsData]);

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
    setWTotals({});
    setWState("form");
    setIsDeckFull(true);
    setDrawnCards([]);
    setCurrentExercise(null);
    setClockStart(null);
    setFinalTime(null);
    setMultiplier(1);
    setSkippedCounter(0);
    setTapOut(false);
    setIsSaved(false);
    setInsights(null);
    setInsightsData(null);
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
        wTotals,
        setWTotals,
        resetWorkout,
        isDeckFull,
        setIsDeckFull,
        drawnCards,
        setDrawnCards,
        currentExercise,
        setCurrentExercise,
        clockStart,
        setClockStart,
        finalTime,
        setFinalTime,
        formatClock,
        multiplier,
        setMultiplier,
        skippedCounter,
        setSkippedCounter,
        tapOut,
        setTapOut,
        isSaved,
        setIsSaved,
        insights,
        setInsights,
        insightsData,
        setInsightsData,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkoutContext() {
  return useContext(WorkoutContext);
}
