"use client";

import { useState } from "react";
import { useWorkoutContext } from "@/contexts/WorkoutContext";
import { parseStats } from "@/lib/index";

// Component to display a table of all exercises with name, suit, and reps completed
export default function WStats() {
  const { wStats, skippedCounter, deckSize } = useWorkoutContext();
  const [isOpen, setIsOpen] = useState(true);
  const medals = ["🥇 ", "🥈 ", "🥉 "];
  let medal = null;

  if (deckSize === "full") {
    // 0 skips = gold; 1-10 skips = silver; 11-20 skips = bronze, >20 skips = no medal
    medal =
      skippedCounter === 0
        ? medals[0]
        : skippedCounter <= 10
        ? medals[1]
        : skippedCounter <= 20
        ? medals[2]
        : null;
  } else if (deckSize === "half") {
    // 0 skips = gold; 1-5 skips = silver; 6-10 skips = bronze; >10 skips = no medal
    medal =
      skippedCounter === 0
        ? medals[0]
        : skippedCounter <= 5
        ? medals[1]
        : skippedCounter <= 10
        ? medals[2]
        : null;
  }

  const exerciseList = parseStats(wStats);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="w-full max-w-lg bg-slate rounded-lg text-center flex flex-col items-center gap-4">
      <button
        onClick={toggleDropdown}
        className="py-2 px-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition flex items-center justify-center cursor-pointer"
      >
        <span>{medal}Final Stats</span>
        <span className={`ml-2 transform ${isOpen ? "rotate-90" : ""}`}>➔</span>
      </button>
      {isOpen && (
        <div className="w-full bg-gray-800 border border-gray-700 rounded-lg p-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="py-2 px-4 font-semibold">Exercise</th>
                <th className="py-2 px-4 font-semibold">Group</th>
                <th className="py-2 px-4 font-semibold">Suit</th>
                <th className="py-2 px-4 font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {exerciseList.length > 0 ? (
                exerciseList.map((exercise, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="py-2 px-4">{exercise.name}</td>
                    <td className="py-2 px-4 capitalize">{exercise.group}</td>
                    <td className="py-2 px-4">
                      {exercise.suit === "clubs" && "♣️"}
                      {exercise.suit === "hearts" && "♥️"}
                      {exercise.suit === "spades" && "♠️"}
                      {exercise.suit === "diamonds" && "♦️"}
                    </td>
                    <td className="py-2 px-4">
                      {exercise.reps}{" "}
                      {exercise.group === "timed" ? "sec" : "reps"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="py-2 px-4 text-center text-gray-400"
                  >
                    No stats recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
