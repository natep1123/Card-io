"use client";

import { useWorkoutContext } from "@/contexts/WorkoutContext";
import WStats from "./tables/WStats";

export default function WSummary() {
  const { resetWorkout, finalTime, skippedCounter, deckSize } =
    useWorkoutContext();

  function handleClick() {
    resetWorkout();
  }

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Workout Summary</h2>
        <table className="w-full max-w-xs text-left border-collapse text-white">
          <tbody>
            <tr className="border-b border-gray-600">
              <td className="py-2 px-4">Total Time</td>
              <td className="py-2 px-4 font-bold">{finalTime}</td>
            </tr>
            <tr className="border-b border-gray-600">
              <td className="py-2 px-4">Total Cards</td>
              <td className="py-2 px-4 font-semibold">
                {deckSize === "full" ? 52 : 26}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4">Skipped</td>
              <td className="py-2 px-4 font-semibold">{skippedCounter}</td>
            </tr>
          </tbody>
        </table>
      </div>
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
