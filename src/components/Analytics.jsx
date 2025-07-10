"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import LineChart from "@/components/workout/charts/LineChart";
import Loader from "@/components/Loader";
import {
  getWorkoutStats,
  getColorPreference,
  saveColorPreference,
} from "@/lib/index";
import { useRouter } from "next/navigation";

export default function Analytics() {
  const { data: session } = useSession();
  const [deckSize, setDeckSize] = useState("full");
  const [multiplier, setMultiplier] = useState("1");
  const [workoutType, setWorkoutType] = useState("original");
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const colors = {
    red: { border: "rgba(255, 99, 132, 1)", bg: "rgba(255, 99, 132, 0.2)" },
    blue: { border: "rgba(54, 162, 235, 1)", bg: "rgba(54, 162, 235, 0.2)" },
    yellow: { border: "rgba(255, 206, 86, 1)", bg: "rgba(255, 206, 86, 0.2)" },
    green: { border: "rgba(75, 192, 192, 1)", bg: "rgba(75, 192, 192, 0.2)" },
    white: { border: "rgba(255, 255, 255, 1)", bg: "rgba(255, 255, 255, 0.2)" },
  };
  const [selectedColor, setSelectedColor] = useState("red");
  const [hasLoadedColorPref, setHasLoadedColorPref] = useState(false);
  const router = useRouter();

  // Load user color preference on mount
  useEffect(() => {
    if (!session) return;
    const loadColorPreference = async () => {
      const preference = await getColorPreference();
      setSelectedColor(preference);
      setHasLoadedColorPref(true);
    };
    loadColorPreference();
  }, [session]);

  // Debounced fetch function
  useEffect(() => {
    let timeoutId;
    const fetchWorkouts = async () => {
      setLoading(true);
      try {
        const response = await getWorkoutStats(
          deckSize,
          multiplier,
          workoutType
        );
        setWorkouts(response.workouts);
      } catch (error) {
        console.error("Error fetching workouts:", error);
        alert("Failed to load workout data.");
      } finally {
        setLoading(false);
      }
    };

    // Debounce API call
    timeoutId = setTimeout(fetchWorkouts, 500);

    return () => clearTimeout(timeoutId);
  }, [deckSize, multiplier, workoutType]);

  // Update chart on color change and save preference only after initial load
  useEffect(() => {
    if (!hasLoadedColorPref) return;

    if (workouts.length > 0) {
      // Trigger a re-render of the chart with the new color
      setWorkouts([...workouts]);
    }

    const saveColor = async () => {
      await saveColorPreference(selectedColor);
    };
    saveColor();
  }, [selectedColor, hasLoadedColorPref]);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 flex flex-col gap-6">
      <button
        onClick={() => router.back()}
        className="px-4 py-2 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition"
      >
        Back to Profile
      </button>
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-white mb-1">Deck Size:</label>
          <select
            value={deckSize}
            onChange={(e) => setDeckSize(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg p-2"
          >
            <option value="full">Full</option>
            <option value="half">Half</option>
          </select>
        </div>
        <div>
          <label className="block text-white mb-1">Multiplier:</label>
          <select
            value={multiplier}
            onChange={(e) => setMultiplier(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg p-2"
          >
            <option value="1">x1</option>
            <option value="2">x2</option>
            <option value="3">x3</option>
          </select>
        </div>
        <div>
          <label className="block text-white mb-1">Workout Type:</label>
          <select
            value={workoutType}
            onChange={(e) => setWorkoutType(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg p-2"
          >
            <option value="original">Original</option>
          </select>
        </div>
        <div>
          <label className="block text-white mb-1">Chart Color:</label>
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg p-2"
          >
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
            <option value="white">White</option>
          </select>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : workouts.length > 0 ? (
        <LineChart workouts={workouts} color={colors[selectedColor]} />
      ) : (
        <p className="text-white text-center">
          No workouts found for the selected filters.
        </p>
      )}
    </div>
  );
}
