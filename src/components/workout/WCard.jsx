"use client";

import { useState, useEffect } from "react";
import { useWorkoutContext } from "@/contexts/WorkoutContext";

export default function WCard() {
  const { deckId, exercises } = useWorkoutContext();
  const [clock, setClock] = useState(0);
  const [cardsFlipped, setCardsFlipped] = useState(0);

  // Generate a clock to show time elapsed
  useEffect(() => {
    const interval = setInterval(() => {
      setClock((prevClock) => prevClock + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [clock]);

  // Format clock as 0:45:26 45 min and 26 sec
  const formatClock = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center">
      <h2>{formatClock(clock)}</h2>

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
