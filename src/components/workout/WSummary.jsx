"use client";

import { useWorkoutContext } from "@/contexts/WorkoutContext";
import WStats from "./tables/WStats";

export default function WSummary() {
  const { startFresh } = useWorkoutContext();

  function handleClick() {
    startFresh();
  }

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Workout Summary</h2>
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
