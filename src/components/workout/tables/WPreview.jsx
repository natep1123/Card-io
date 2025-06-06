"use client";

import { useState, useEffect } from "react";
import { useWorkoutContext } from "@/contexts/WorkoutContext";
import { getWorkout } from "@/lib/index";
import Loader from "@/components/Loader";

// Component to display tables of exercises by group (push, pull, legs) with suit and type
export default function WPreview() {
  const { exercises, setExercises, multiplier } = useWorkoutContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isIndexOpen, setIsIndexOpen] = useState(false);
  const allExercises = { clubs: [], diamonds: [], hearts: [], spades: [] };

  // Fetch exercises on mount
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await getWorkout("original");
        setExercises(res);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };
    fetchExercises();
  }, [setExercises]);

  function groupBySuit(exercises) {
    if (!exercises) return;

    exercises.numberExercises.forEach((exercise) => {
      allExercises[exercise.suit].push({ ...exercise, type: "number" });
    });
    exercises.royalExercises.forEach((exercise) => {
      allExercises[exercise.suit].push({ ...exercise, type: "royal" });
    });
    exercises.aceExercises.forEach((exercise) => {
      allExercises[exercise.suit].push({ ...exercise, type: "ace" });
    });
  }

  // Show loader if no exercises, else group them by suit
  if (!exercises) {
    return <Loader />;
  } else {
    groupBySuit(exercises);
  }

  // Determine suit-to-group mapping
  const suitToGroup = {};
  Object.keys(allExercises).forEach((suit) => {
    const exercise = allExercises[suit][0];
    if (exercise) {
      suitToGroup[suit] = exercise.group;
    }
  });

  // Define desired group order
  const groupOrder = ["push", "pull", "legs", "core"];

  // Sort suits based on their group, following groupOrder
  const sortedSuits = Object.keys(suitToGroup).sort((a, b) => {
    const groupA = suitToGroup[a];
    const groupB = suitToGroup[b];
    return groupOrder.indexOf(groupA) - groupOrder.indexOf(groupB);
  });

  // Toggle main dropdown visibility
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Toggle index table visibility
  const toggleIndexDropdown = () => setIsIndexOpen(!isIndexOpen);

  // Render a single table for a given exercise type
  const renderTable = (exerciseList, suit) => (
    <div className="w-full bg-gray-800 border border-gray-700 rounded-lg p-4">
      <h4 className="text-md text-left font-semibold mb-2">
        {suit === "clubs" && "♣️ Clubs"}
        {suit === "hearts" && "♥️ Hearts"}
        {suit === "spades" && "♠️ Spades"}
        {suit === "diamonds" && "♦️ Diamonds"}
      </h4>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-600">
            <th className="py-2 px-4">Exercise</th>
            <th className="py-2 px-4">Group</th>
            <th className="py-2 px-4">Type</th>
          </tr>
        </thead>
        <tbody>
          {exerciseList.map((exercise, index) => (
            <tr key={index} className="border-b border-gray-700">
              <td className="py-2 px-4">{exercise.name}</td>
              <td className="py-2 px-4 capitalize">{exercise.group}</td>
              <td className="py-2 px-4 capitalize">{exercise.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Data for the summary table
  const summaryData = [
    { cardType: "Numbers", sets: 9, value: "2-10" },
    { cardType: "Royals", sets: 3, value: "5" },
    { cardType: "Aces", sets: 1, value: "30" },
  ];
  // Adjust reps/time based on multiplier
  summaryData.forEach((row) => {
    if (row.cardType === "Aces") {
      row.value = `${parseInt(row.value) * multiplier} sec`;
    } else if (row.cardType === "Royal Cards") {
      row.value = `${parseInt(row.value) * multiplier} reps`;
    } else {
      row.value = `${row.value
        .split("-")
        .map((num) => parseInt(num) * multiplier)
        .join("-")} reps`;
    }
  });

  return (
    <div className="w-full max-w-lg bg-slate rounded-lg text-center flex flex-col items-center gap-4">
      <button
        onClick={toggleDropdown}
        className="py-2 px-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition flex items-center justify-center cursor-pointer"
      >
        <span>Preview</span>
        <span className={`ml-2 transform ${isOpen ? "rotate-90" : ""}`}>➔</span>
      </button>
      {isOpen && (
        <div className="w-full flex flex-col gap-4">
          <div>
            <button
              onClick={toggleIndexDropdown}
              className="py-2 px-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition flex items-center justify-start cursor-pointer"
            >
              <span>Index</span>
              <span
                className={`ml-2 transform ${isIndexOpen ? "rotate-90" : ""}`}
              >
                ➔
              </span>
            </button>
            {isIndexOpen && (
              <table className="w-full text-left border-collapse p-4">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="py-2 px-4">Card Type</th>
                    <th className="py-2 px-4">Sets</th>
                    <th className="py-2 px-4">Reps/Time</th>
                  </tr>
                </thead>
                <tbody>
                  {summaryData.map((row, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="py-2 px-4">{row.cardType}</td>
                      <td className="py-2 px-4">{row.sets}</td>
                      <td className="py-2 px-4">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          {sortedSuits.map((suit) => (
            <div key={suit}>{renderTable(allExercises[suit], suit)}</div>
          ))}
        </div>
      )}
    </div>
  );
}
