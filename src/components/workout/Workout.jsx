"use client";

import { useWorkoutContext } from "@/contexts/WorkoutContext";
import WorkoutForm from "./WForm";
import WDisplay from "./WDisplay";
import WSummary from "./WSummary";
import WPreview from "./tables/WPreview";

export default function Workout() {
  const { wState } = useWorkoutContext();

  return (
    <div className="flex flex-col items-center">
      {/* Pre-Workout Form */}
      {wState === "form" && (
        <div className="flex flex-col items-center gap-4">
          <WorkoutForm />
          <WPreview />
        </div>
      )}

      {/* Workout Card */}
      {wState === "workout" && <WDisplay />}

      {/* Post-Workout Summary */}
      {wState === "summary" && <WSummary />}
    </div>
  );
}
