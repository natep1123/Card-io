"use client";

import { useEffect, useState } from "react";
import { useWorkoutContext } from "@/contexts/WorkoutContext";
import WForm from "./WForm";
import WDisplay from "./WDisplay";
import WSummary from "./WSummary";
import WPreview from "./tables/WPreview";
import Loader from "../Loader";

export default function Workout() {
  const { wState } = useWorkoutContext();
  const [hydrated, setHydrated] = useState(false);

  // Prevent flash of default state on hydration
  useEffect(() => {
    setTimeout(() => {
      setHydrated(true);
    }, 500);
  }, []);

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* Pre-Workout Form and Preview */}
      {wState === "form" && (
        <div className="flex flex-col items-center gap-8">
          <WForm />
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
