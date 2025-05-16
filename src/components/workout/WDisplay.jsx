"use client";

// This component displays the workout card with a clock and interactive card pile

import { useState, useEffect } from "react";
import { useWorkoutContext } from "@/contexts/WorkoutContext";
import { getExercises, getExerciseByCard } from "@/lib/exercisesLogic";
import { getFullDeck, getHalfDeck, drawCard } from "@/lib/cardsApi";

export default function WCard() {
  const { deckId, setDeckId, exercises, setExercises, deckSize } =
    useWorkoutContext();
  const [clock, setClock] = useState(0);
  const [cardsFlipped, setCardsFlipped] = useState(0);
  const [drawnCards, setDrawnCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [currentExercise, setCurrentExercise] = useState(null);

  // Fetch a new deck of cards and exercises
  useEffect(() => {
    const fetchData = async () => {
      if (deckId && exercises) return; // Skip if already fetched

      // Initialize response variables
      let deckIdRes = null;
      let exercisesRes = null;

      // Data Fetching
      try {
        deckIdRes =
          deckSize === "half" ? await getHalfDeck() : await getFullDeck();
        exercisesRes = getExercises();
        setDeckId(deckIdRes);
        setExercises(exercisesRes);
        setCardsFlipped(0);
      } catch (error) {
        console.error("Error fetching deck:", error);
      }
    };
    fetchData();
  }, [deckId, exercises, deckSize]);

  // Generate a clock to show time elapsed
  useEffect(() => {
    const interval = setInterval(() => {
      setClock((prevClock) => prevClock + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [clock]);

  // Format clock as 0:45:26
  const formatClock = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Function to handle drawing a card
  const handleDrawCard = async () => {
    if (deckId) {
      try {
        const cardData = await drawCard(deckId);
        if (cardData.cards.length > 0) {
          // Get a card
          const card = cardData.cards[0];
          card.value = card.value.toLowerCase();
          card.suit = card.suit.toLowerCase();
          const tilt = Math.floor(Math.random() * 21) - 10; // Random tilt between -10 and 10 degrees
          setCurrentCard(card);
          setDrawnCards((prev) => [...prev, { ...card, tilt }]);
          setCardsFlipped((prev) => prev + 1);

          // Get the corresponding exercise
          const exercise = getExerciseByCard(card, exercises);
          setCurrentExercise(exercise);
          console.log("Current Card:", card);
          console.log("Exercise:", exercise);
        } else {
          console.log("No more cards left in the deck.");
        }
      } catch (error) {
        console.error("Error drawing card:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-white">{formatClock(clock)}</h2>
      <span className="text-gray">
        Cards Remaining:{" "}
        {deckSize === "full" ? 52 - cardsFlipped : 26 - cardsFlipped}
      </span>

      {/* Card Pile */}
      <div
        onClick={handleDrawCard}
        className="relative w-32 h-48 cursor-pointer my-2"
      >
        {/* Show 3 stacked back cards when no cards flipped */}
        {cardsFlipped === 0 ? (
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

      {/* Current Exercise */}
      {currentExercise && (
        <div className="bg-gray-800 p-4 rounded-lg text-white text-center">
          <h3 className="text-lg font-semibold">{currentExercise.name}</h3>
          <span>
            {["jack", "queen", "king"].includes(currentCard.value)
              ? 10
              : currentCard.value === "ace"
              ? currentExercise.time
              : parseInt(currentCard.value, 10)}{" "}
            {currentExercise.unit}
          </span>
        </div>
      )}
    </div>
  );
}
