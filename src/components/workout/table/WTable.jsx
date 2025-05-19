"use client";

import { useState } from "react";
import { useWorkoutContext } from "@/contexts/WorkoutContext";

// Component to display three tables of exercises (number cards, royals, aces) with group, suit, and total reps/time
export default function WTable() {
  const { exercises } = useWorkoutContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isIndexOpen, setIsIndexOpen] = useState(false);
  const allExercises = { clubs: [], diamonds: [], hearts: [], spades: [] };

  function groupBySuit(exercises) {
    exercises?.numberExercises.forEach((exercise) => {
      allExercises[exercise.suit].push({ ...exercise, type: "number" });
    });
    exercises?.royalExercises.forEach((exercise) => {
      allExercises[exercise.suit].push({ ...exercise, type: "royal" });
    });
    exercises?.aceExercises.forEach((exercise) => {
      allExercises[exercise.suit].push({ ...exercise, type: "ace" });
    });
  }
  groupBySuit(exercises);

  if (!exercises) {
    return (
      <div className="w-full max-w-lg p-4 bg-gray-800 rounded-lg text-white">
        <h3 className="text-lg font-semibold mb-4">Loading...</h3>
      </div>
    );
  }

  // Toggle main dropdown visibility
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Toggle index table visibility
  const toggleIndexDropdown = () => setIsIndexOpen(!isIndexOpen);

  // Render a single table for a given exercise type
  const renderTable = (exerciseList, suit) => (
    <div className="w-full mb-6 bg-gray-800 border border-gray-700 rounded-lg p-4">
      <h4 className="text-md text-left font-semibold mb-2">{suit}</h4>
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
    { cardType: "Number Cards", sets: 9, repsTime: "2-10 reps" },
    { cardType: "Royal Cards (J,Q,K)", sets: 3, repsTime: "10 reps" },
    { cardType: "Aces", sets: 1, repsTime: "30/45/60 seconds" },
  ];

  return (
    <div className="w-full max-w-lg p-4 bg-slate rounded-lg text-center flex flex-col items-center">
      <button
        onClick={toggleDropdown}
        className="py-2 px-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition flex items-center justify-center cursor-pointer"
      >
        <span>Preview</span>
        <span className={`ml-2 transform ${isOpen ? "rotate-90" : ""}`}>➔</span>
      </button>
      {isOpen && (
        <div className="mt-4 w-full">
          <div className="mb-4">
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
              <table className="w-full text-left border-collapse mt-2 p-4">
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
                      <td className="py-2 px-4">{row.repsTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          {renderTable(allExercises.clubs, "♣️ Clubs")}
          {renderTable(allExercises.hearts, "♥️ Hearts")}
          {renderTable(allExercises.spades, "♠️ Spades")}
          {renderTable(allExercises.diamonds, "♦️ Diamonds")}
        </div>
      )}
    </div>
  );
}
