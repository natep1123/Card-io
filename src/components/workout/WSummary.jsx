"use client";

import { useWorkoutContext } from "@/contexts/WorkoutContext";
import { useEffect, useState } from "react";
import WStats from "./tables/WStats";

export default function WSummary() {
  const { resetWorkout, clockStart, formatClock } = useWorkoutContext();
  const [clock, setClock] = useState(null);

  useEffect(() => {
    const elapsed = Math.floor((Date.now() - clockStart) / 1000);
    setClock(elapsed);
  }, [clockStart]);

  function handleClick() {
    resetWorkout();
  }

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Workout Summary</h2>
      <h3 className="text-lg">
        Total Time: <span className="font-bold">{formatClock(clock)}</span>
      </h3>
      <WStats />
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-700 rounded-lg cursor-pointer hover:bg-blue-600 transition"
      >
        Reset
      </button>
    </div>
  );
}
