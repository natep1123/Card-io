"use client";

import { useWorkoutContext } from "@/contexts/WorkoutContext";

export default function WCard() {
  const { deck, exercises, deckSize } = useWorkoutContext();

  console.log("DECK", deck.length);
  return (
    <div className="flex flex-col items-center">
      <p>Workout Card</p>
      {/* Back of Card at Start */}
      {deck.length === 52 && (
        <img
          src="https://deckofcardsapi.com/static/img/back.png"
          alt="Back of Card"
        />
      )}
    </div>
  );
}
