"use client";

// This component displays the workout card with a clock and interactive card pile

import { useState, useEffect, useRef } from "react";
import { useWorkoutContext } from "@/contexts/WorkoutContext";
import { getDeck, drawCard, getExerciseByCard } from "@/lib/index";
import Loader from "../Loader";

export default function WDisplay() {
  const {
    deck,
    setDeck,
    exercises,
    setWState,
    deckSize,
    setWStats,
    isDeckFull,
    setIsDeckFull,
    drawnCards,
    setDrawnCards,
    currentExercise,
    setCurrentExercise,
    clockStart,
    setClockStart,
    setFinalTime,
    formatClock,
    multiplier,
    setSkippedCounter,
    setTapOut,
  } = useWorkoutContext();

  const [clock, setClock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [drawing, setDrawing] = useState(false);
  const isFetchingRef = useRef(false); // ref to prevent multiple fetches

  // Fetch a new deck of cards and exercises
  useEffect(() => {
    if (deck.deckId && deck.cards.length > 0 && exercises) {
      setLoading(false);
      return;
    }
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    const fetchDeck = async () => {
      try {
        const deckRes = await getDeck(deckSize);
        setDeck(deckRes);
        const now = Date.now();
        if (!clockStart) setClockStart(now);
        setClock(Math.floor((now - (clockStart || now)) / 1000));
        // Exercises fetched at the form component
        // Keep loading true until exercises are confirmed loaded
      } catch (error) {
        console.error("Error fetching deck:", error);
      } finally {
        isFetchingRef.current = false;
      }
    };
    fetchDeck();
  }, [deck.deckId, deckSize, exercises, clockStart]);

  // Generate clock based on timestamp
  useEffect(() => {
    if (!clockStart) return;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - clockStart) / 1000);
      setClock(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [clockStart]);

  // Function to handle drawing a card
  const handleDrawCard = () => {
    if (drawing) return; // Block draws while drawing
    setDrawing(true);

    try {
      const cardData = drawCard(deck.cards);
      const { drawnCard, cardsAfterDraw, remaining } = cardData;
      const newDeck = { ...deck, cards: cardsAfterDraw, remaining };

      if (drawnCard) {
        drawnCard.value = drawnCard.value.toLowerCase();
        drawnCard.suit = drawnCard.suit.toLowerCase();
        const tilt = Math.floor(Math.random() * 21) - 10;

        const exercise = getExerciseByCard(drawnCard, exercises, multiplier);
        const key = `${exercise.name}-${exercise.suit}-${exercise.group}`;

        setWStats((prev) => ({
          ...prev,
          [key]: (prev[key] || 0) + exercise.value,
        }));
        setCurrentExercise(exercise);
        setDrawnCards((prev) => [...prev, { ...drawnCard, tilt }]);
        setDeck(newDeck);
      } else {
        handleEnd();
      }
    } catch (error) {
      console.error("Error drawing card:", error);
    } finally {
      if (isDeckFull) setIsDeckFull(false);
      setDrawing(false);
    }
  };

  // Function to handle skipping a card
  const handleSkip = () => {
    if (deck.remaining > 0) {
      const confirmSkip = window.confirm(
        "Are you sure you want to skip this card?"
      );
      if (!confirmSkip) return;
    }
    // Remove current exercise reps from stats
    const exercise = currentExercise;
    const key = `${exercise.name}-${exercise.suit}-${exercise.group}`;

    // Update states
    setWStats((prev) => ({
      ...prev,
      [key]:
        (prev[key] || 0) - exercise.value < 0 ? 0 : prev[key] - exercise.value,
    }));
    setSkippedCounter((prev) => prev + 1);

    // Draw a new card
    handleDrawCard();
  };

  // Function to handle ending workout early
  const handleEnd = () => {
    if (deck.remaining > 0) {
      const confirmTapOut = window.confirm(
        "No shame! Are you sure you want to tap out?"
      );
      if (!confirmTapOut) return;
      setTapOut(true);
      setSkippedCounter((prev) => prev + deck.remaining);
    }
    const elapsed = Math.floor((Date.now() - clockStart) / 1000);
    setFinalTime(formatClock(elapsed));
    setWState("summary");
  };

  if (loading || clock === null || deck.remaining === null) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-16 md:gap-8">
      {/* Clock and Cards Remaining */}
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-white">{formatClock(clock)}</h2>
        <span className="text-gray">Cards Remaining: {deck.remaining}</span>
      </div>

      {/* Card Pile and Exercise */}
      <div className="flex flex-col items-center gap-12 md:gap-6">
        <div
          onClick={handleDrawCard}
          className="relative w-32 h-48 cursor-pointer"
        >
          {isDeckFull ? (
            <>
              {[-5, 0, 5].map((angle, index) => (
                <img
                  key={index}
                  src="https://deckofcardsapi.com/static/img/back.png"
                  alt="Back of Card"
                  className="absolute w-full h-full"
                  style={{ transform: `rotate(${angle}deg)` }}
                />
              ))}
            </>
          ) : (
            <>
              {drawnCards.map((card, index) => (
                <img
                  key={`${card.code}-${index}`}
                  src={card.image}
                  alt={`${card.value} of ${card.suit}`}
                  className="absolute w-full h-full"
                  style={{ transform: `rotate(${card.tilt}deg)` }}
                />
              ))}
            </>
          )}
        </div>

        {currentExercise && (
          <div className="w-full bg-gray-800 p-4 rounded-lg text-white text-center font-semibold">
            <h3 className="text-lg">{currentExercise.name}</h3>
            <p>
              <span className={``}>{currentExercise.value}</span>{" "}
              {currentExercise.unit}
            </p>
          </div>
        )}
      </div>

      {/* Button Options */}
      {deck.remaining === 0 ? (
        <button
          onClick={handleEnd}
          className="px-4 py-2 bg-green rounded-lg cursor-pointer hover:bg-green-600 transition"
        >
          Finish
        </button>
      ) : isDeckFull ? null : (
        <div className="flex flex-col items-center gap-6">
          <button
            onClick={handleSkip}
            className="px-4 py-2 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition"
          >
            Skip Card
          </button>
          <button
            onClick={handleEnd}
            className="px-4 py-2 bg-red rounded-lg cursor-pointer hover:bg-red-600 transition"
          >
            Tap Out
          </button>
        </div>
      )}
    </div>
  );
}
