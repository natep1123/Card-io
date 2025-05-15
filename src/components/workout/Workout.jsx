"use client";

import { useWorkoutContext } from "@/contexts/WorkoutContext";
import { useEffect } from "react";
import WorkoutForm from "./WForm";
import WCard from "./WCard";

export default function Workout() {
  const { wState } = useWorkoutContext();

  return (
    <div className="flex flex-col items-center">
      {/* Pre-Workout Form */}
      {wState === "form" && <WorkoutForm />}

      {/* Workout Card */}
      {wState === "workout" && <WCard />}

      {/* Post-Workout Summary */}
    </div>
  );
}
