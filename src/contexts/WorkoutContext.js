"use client";

import { createContext, useContext, useState } from "react";

const WorkoutContext = createContext();

export function WorkoutProvider({ children }) {
  const [deckId, setDeckId] = useState(null);
  const [exercises, setExercises] = useState(null);
  const [wState, setWState] = useState("form");
  const [deckSize, setDeckSize] = useState("full");

  return (
    <WorkoutContext.Provider
      value={{
        deckId,
        setDeckId,
        exercises,
        setExercises,
        wState,
        setWState,
        deckSize,
        setDeckSize,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkoutContext() {
  return useContext(WorkoutContext);
}
