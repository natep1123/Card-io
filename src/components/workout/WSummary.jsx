"use client";

import { useWorkoutContext } from "@/contexts/WorkoutContext";
import { saveStats, formatStats } from "@/lib";
import WStats from "./tables/WStats";
import { useSession } from "next-auth/react";
import BarChart from "./charts/BarChart";

export default function WSummary() {
  const { data: session } = useSession();

  const {
    resetWorkout,
    finalTime,
    skippedCounter,
    deckSize,
    multiplier,
    wStats,
    wTotals,
    isSaved,
    setIsSaved,
  } = useWorkoutContext();

  const formattedStats = formatStats(
    wStats,
    wTotals,
    deckSize,
    multiplier,
    finalTime
  );

  function handleReset() {
    // Check if the user really wants to reset
    const confirmReset = window.confirm(
      "Are you sure you want to reset the workout? This will clear all stats."
    );
    if (!confirmReset) return;
    resetWorkout();
  }

  async function handleSave() {
    if (isSaved) {
      alert("Stats have already been saved. You cannot save again.");
      return;
    } else if (!session) {
      alert("You must be logged in to save stats.");
      return;
    }

    const res = await saveStats(formattedStats);

    if (res.status === 201) {
      alert("Stats saved successfully!");
      setIsSaved(true);
    } else {
      alert("Failed to save stats. Please try again.");
    }
  }

  return (
    <div className="w-full max-w-2x1 flex flex-col items-center gap-4">
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
      <BarChart stats={formattedStats.stats} />
      <WStats />
      <div className="flex flex-col gap-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-700 rounded-lg cursor-pointer hover:bg-blue-600 transition"
        >
          Save Stats
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-red-700 rounded-lg cursor-pointer hover:bg-red-600 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
