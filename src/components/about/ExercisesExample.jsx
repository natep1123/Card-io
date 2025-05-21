"use client";

import { useState } from "react";

export default function ExercisesExample() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const exercisesExample = {
    numberExercises: [
      {
        name: "Clap Pushups",
        unit: "reps",
        group: "push",
        suit: "clubs",
      },
      {
        name: "Chin-Ups",
        unit: "reps",
        group: "pull",
        suit: "diamonds",
      },
      {
        name: "Lunges",
        unit: "reps per leg",
        group: "legs",
        suit: "hearts",
      },
      {
        name: "Hanging Leg Raises",
        unit: "reps",
        group: "core",
        suit: "spades",
      },
    ],
    royalExercises: [
      {
        name: "Decline Pushups",
        unit: "reps",
        group: "push",
        suit: "clubs",
      },
      {
        name: "Pull-Ups",
        unit: "reps",
        group: "pull",
        suit: "diamonds",
      },
      {
        name: "Bodyweight Squats",
        unit: "reps",
        group: "legs",
        suit: "hearts",
      },
      {
        name: "Floor Leg Raises",
        unit: "reps",
        group: "core",
        suit: "spades",
      },
    ],
    aceExercises: [
      {
        name: "Rest",
        unit: "sec",
        group: "timed",
        time: "30",
        suit: "clubs",
      },
      {
        name: "Wall Sit",
        unit: "sec",
        group: "timed",
        time: "30",
        suit: "diamonds",
      },
      {
        name: "Plank",
        unit: "sec",
        group: "timed",
        time: "60",
        suit: "hearts",
      },
      {
        name: "Mountain Climbers",
        unit: "sec",
        group: "timed",
        time: "45",
        suit: "spades",
      },
    ],
  };

  return (
    <div className="space-y-4 mt-4">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="py-2 px-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition flex items-center justify-start cursor-pointer"
      >
        <span>Example Exercises</span>
        <span className={`ml-2 transform ${isDropdownOpen ? "rotate-90" : ""}`}>
          ➔
        </span>
      </button>
      {isDropdownOpen && (
        <div className="space-y-4">
          <div className="w-full bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h4 className="text-md font-semibold mb-2">Number Exercises</h4>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="py-2 px-4">Exercise</th>
                  <th className="py-2 px-4">Group</th>
                  <th className="py-2 px-4">Suit</th>
                </tr>
              </thead>
              <tbody>
                {exercisesExample.numberExercises.map((exercise, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="py-2 px-4">{exercise.name}</td>
                    <td className="py-2 px-4 capitalize">{exercise.group}</td>
                    <td className="py-2 px-4 capitalize">{exercise.suit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h4 className="text-md font-semibold mb-2">Royal Exercises</h4>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="py-2 px-4">Exercise</th>
                  <th className="py-2 px-4">Group</th>
                  <th className="py-2 px-4">Suit</th>
                </tr>
              </thead>
              <tbody>
                {exercisesExample.royalExercises.map((exercise, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="py-2 px-4">{exercise.name}</td>
                    <td className="py-2 px-4 capitalize">{exercise.group}</td>
                    <td className="py-2 px-4 capitalize">{exercise.suit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h4 className="text-md font-semibold mb-2">Ace Exercises</h4>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="py-2 px-4">Exercise</th>
                  <th className="py-2 px-4">Group</th>
                  <th className="py-2 px-4">Suit</th>
                </tr>
              </thead>
              <tbody>
                {exercisesExample.aceExercises.map((exercise, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="py-2 px-4">{exercise.name}</td>
                    <td className="py-2 px-4 capitalize">{exercise.group}</td>
                    <td className="py-2 px-4 capitalize">{exercise.suit}</td>
                    <td className="py-2 px-4">
                      {exercise.time} {exercise.unit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
