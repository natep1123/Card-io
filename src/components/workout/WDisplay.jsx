"use client";

// This component displays the workout card with a clock and interactive card pile

import { useState, useEffect } from "react";
import { useWorkoutContext } from "@/contexts/WorkoutContext";
import { getExerciseByCard } from "@/lib/exercisesLogic";
import { getDeck, drawCard } from "@/lib/cardsLogic";
import Loader from "../Loader";

export default function WDisplay() {
  const {
    deck,
    setDeck,
    exercises,
    setExercises,
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
    formatClock,
  } = useWorkoutContext();

  const [clock, setClock] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch a new deck of cards and exercises
  useEffect(() => {
    if (deck.deckId) {
      if (clockStart) {
        const initial = Math.floor((Date.now() - clockStart) / 1000);
        setClock(initial);
      }
      setLoading(false);
      return; // If deck already exists, do not fetch again
    }

    const fetchDeck = async () => {
      try {
        const deckRes = await getDeck(deckSize);
        setDeck(deckRes);
        const now = Date.now();
        if (!clockStart) setClockStart(now);
        setClock(Math.floor((now - (clockStart || now)) / 1000));
      } catch (error) {
        console.error("Error fetching deck:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDeck();
  }, []);

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
    if (isDeckFull) setIsDeckFull(false);

    try {
      const cardData = drawCard(deck.cards);
      const { drawnCard, cardsAfterDraw, remaining } = cardData;
      const newDeck = { ...deck, cards: cardsAfterDraw, remaining };

      if (drawnCard) {
        drawnCard.value = drawnCard.value.toLowerCase();
        drawnCard.suit = drawnCard.suit.toLowerCase();
        const tilt = Math.floor(Math.random() * 21) - 10;

        const exercise = getExerciseByCard(drawnCard, exercises);
        const key = `${exercise.name}-${exercise.suit}-${exercise.group}`;

        setWStats((prev) => ({
          ...prev,
          [key]: (prev[key] || 0) + exercise.value,
        }));
        setCurrentExercise(exercise);
        setDrawnCards((prev) => [...prev, { ...drawnCard, tilt }]);

        setDeck(newDeck);
      } else {
        setWState("summary");
        setDeck({ deckId: null, cards: [], remaining: null });
        setExercises(null);
      }
    } catch (error) {
      console.error("Error drawing card:", error);
    }
  };

  // Function to handle ending workout early
  const handleEnd = () => {
    if (deck.remaining > 0) {
      const confirmTapOut = window.confirm(
        "No shame! Are you sure you want to tap out?"
      );
      if (!confirmTapOut) return;
    }
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
            <span>
              {currentExercise.value} {currentExercise.unit}
            </span>
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
        <button
          onClick={handleEnd}
          className="px-4 py-2 bg-red rounded-lg cursor-pointer hover:bg-red-600 transition"
        >
          Tap Out
        </button>
      )}
    </div>
  );
}
