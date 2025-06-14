"use client";

import { useWorkoutContext } from "@/contexts/WorkoutContext";

// Component to display a table of all exercises with name, suit, and reps completed
export default function WStats() {
  const { wStats, skippedCounter, deckSize } = useWorkoutContext();
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

  console.log("wStats:", wStats);

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
      <div className="w-full bg-gray-800 border border-gray-700 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2 text-left">
          {medal}Final Stats
        </h3>
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
