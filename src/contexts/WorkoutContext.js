"use client";

import { createContext, useContext, useState } from "react";

const WorkoutContext = createContext();

export function WorkoutProvider({ deck, exercises, children }) {
  const [wState, setWState] = useState("form");
  const [deckSize, setDeckSize] = useState("full");

  return (
    <WorkoutContext.Provider
      value={{ deck, exercises, wState, setWState, deckSize, setDeckSize }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkoutContext() {
  return useContext(WorkoutContext);
}
