"use client";

import { useWorkoutContext } from "@/contexts/WorkoutContext";
import WorkoutForm from "./WForm";
import WDisplay from "./WDisplay";
import WSummary from "./WSummary";

export default function Workout() {
  const { wState } = useWorkoutContext();

  return (
    <div className="flex flex-col items-center">
      {/* Pre-Workout Form */}
      {wState === "form" && <WorkoutForm />}

      {/* Workout Card */}
      {wState === "workout" && <WDisplay />}

      {/* Post-Workout Summary */}
      {wState === "summary" && <WSummary />}
    </div>
  );
}
