"use client";

import { useWorkoutContext } from "@/contexts/WorkoutContext";

// Component to display a table of all exercises with name, suit, and reps completed
export default function WStats() {
  const { wStats } = useWorkoutContext();

  // Parse wStats into an array of exercise objects
  const exerciseList = Object.entries(wStats).map(([key, reps]) => {
    const parts = key.split("-");
    const group = parts.pop(); // Last part is group
    const suit = parts.pop(); // Second-to-last part is suit
    const name = parts.join("-"); // Everything else is the name
    return {
      name,
      group,
      suit,
      reps: typeof reps === "string" ? parseInt(reps, 10) : reps,
    };
  });

  // Define group order
  const groupOrder = ["push", "pull", "legs", "core", "timed"];

  // Sort exercises by group order and then by reps (descending)
  exerciseList.sort((a, b) => {
    const groupA = groupOrder.indexOf(a.group);
    const groupB = groupOrder.indexOf(b.group);
    if (groupA !== groupB) {
      return groupA - groupB; // Sort by group order
    }
    return b.reps - a.reps; // Sort by reps (highest to lowest)
  });

  return (
    <div className="w-full max-w-lg bg-slate text-center flex flex-col items-center">
      <div className="w-full">
        <h3 className="text-lg font-semibold mb-2 text-left">Final Stats</h3>
        <table className="w-full text-left border-collapse border border-gray-700 bg-gray-800">
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
                  <td className="py-2 px-4">{exercise.reps}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-2 px-4 text-center text-gray-400">
                  No stats recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
