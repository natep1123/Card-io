"use client";

import { useState } from "react";
import { useWorkoutContext } from "@/contexts/WorkoutContext";

export default function WCard() {
  const { deckId, exercises } = useWorkoutContext();
  const [clock, setClock] = useState(0);
  const [cardsFlipped, setCardsFlipped] = useState(0);

  return (
    <div className="flex flex-col items-center">
      <h2>Clock Goes Here</h2>

      {/* Back of Card at Start */}
      {cardsFlipped === 0 ? (
        <img
          src="https://deckofcardsapi.com/static/img/back.png"
          alt="Back of Card"
        />
      ) : null}

      {/* Cards Display */}
    </div>
  );
}
