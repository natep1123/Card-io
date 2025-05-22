// This file contains the "original" exercises and logic for the workout generator.

const original = {
  numberExercises: [
    { name: "Pushups", unit: "reps", group: "push" },
    { name: "Horizontal Rows", unit: "reps", group: "pull" },
    { name: "Squats", unit: "reps", group: "legs" },
    { name: "Mountain Climbers", unit: "reps", group: "core" },
  ],
  royalExercises: [
    { name: "Dips", unit: "reps", group: "push" },
    { name: "Pullups", unit: "reps", group: "pull" },
    { name: "Lunges", unit: "reps", group: "legs" },
    { name: "Hanging Leg Raises", unit: "reps", group: "core" },
  ],
  aceExercises: [
    { name: "Plank", unit: "seconds", group: "timed" },
    { name: "Plank", unit: "seconds", group: "timed" },
    { name: "Side Plank", unit: "seconds", group: "timed" },
    { name: "Side Plank", unit: "seconds", group: "timed" },
  ],
};

let suits = ["hearts", "diamonds", "clubs", "spades"]; // Card suits

// Helper; Function to shuffle the suits
function shuffleSuits() {
  const shuffled = [...suits];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Helper; Function to assign suits to exercises (exercises from the same group will have the same suit)
function assignSuit(exerciseArr, shuffledSuits) {
  for (let i = 0; i < exerciseArr.length; i++) {
    // Assign a suit to each exercise
    const suit = shuffledSuits[i];
    exerciseArr[i].suit = suit;
  }
  return exerciseArr;
}

// Get exercises and assign suits
export function getOriginal() {
  const shuffledSuits = shuffleSuits();

  const { numberExercises, royalExercises, aceExercises } = original;

  return {
    numberExercises: assignSuit(numberExercises, shuffledSuits),
    royalExercises: assignSuit(royalExercises, shuffledSuits),
    aceExercises: assignSuit(aceExercises, shuffledSuits),
  };
}

// Function to get an exercise by card
export function getOriginalByCard(card, pool, multiplier) {
  const cardValue = card.value.toLowerCase();
  const cardSuit = card.suit.toLowerCase();

  let exercise = null;

  if (cardValue === "ace") {
    exercise = pool.aceExercises.find((ex) => ex.suit === cardSuit);
  } else if (["jack", "queen", "king"].includes(cardValue)) {
    exercise = pool.royalExercises.find((ex) => ex.suit === cardSuit);
  } else {
    exercise = pool.numberExercises.find((ex) => ex.suit === cardSuit);
  }

  const value =
    (["jack", "queen", "king"].includes(card.value)
      ? 5
      : card.value === "ace"
      ? 30
      : parseInt(card.value, 10)) * multiplier;

  return {
    ...exercise,
    value,
  };
}
