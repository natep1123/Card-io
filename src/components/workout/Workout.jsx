"use client";

import { useWorkoutContext } from "@/contexts/WorkoutContext";
import { useEffect } from "react";
import { getExercises } from "@/lib/exercisesLogic";
import WorkoutForm from "./WForm";
import WDisplay from "./WDisplay";
import WSummary from "./WSummary";
import WTable from "./table/WTable";

export default function Workout() {
  const { wState, setExercises } = useWorkoutContext();

  // Fetch exercises on mount
  useEffect(() => {
    const fetchExercises = () => {
      try {
        const exercisesRes = getExercises();
        setExercises(exercisesRes);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };
    fetchExercises();
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* Pre-Workout Form */}
      {wState === "form" && (
        <div className="flex flex-col items-center gap-4">
          <WorkoutForm />
          <WTable />
        </div>
      )}

      {/* Workout Card */}
      {wState === "workout" && <WDisplay />}

      {/* Post-Workout Summary */}
      {wState === "summary" && <WSummary />}
    </div>
  );
}
