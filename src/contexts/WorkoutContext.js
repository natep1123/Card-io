"use client";

import { createContext, useContext, useState } from "react";

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

  // Function to reset deck and exercises state
  const startFresh = () => {
    setDeck({
      deckId: null,
      cards: [],
      remaining: null,
    });
    setDeckSize("full");
    setWStats({});
    setWState("form");
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
        startFresh,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkoutContext() {
  return useContext(WorkoutContext);
}
