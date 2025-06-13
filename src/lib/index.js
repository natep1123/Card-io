import axios from "axios";

const suits = ["hearts", "diamonds", "clubs", "spades"]; // Card suits

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

// Function to reroll suits
export function rerollSuits(exercisesArr) {
  const shuffledSuits = shuffleSuits();
  return {
    numberExercises: assignSuit(exercisesArr.numberExercises, shuffledSuits),
    royalExercises: assignSuit(exercisesArr.royalExercises, shuffledSuits),
    aceExercises: assignSuit(exercisesArr.aceExercises, shuffledSuits),
  };
}

// API call to /api/deck/new
export async function getDeck(deckSize) {
  try {
    const response = await axios.get("/api/get/deck", { params: { deckSize } });
    return response.data;
  } catch (error) {
    console.error("Error fetching new deck:", error);
    throw error;
  }
}

// Function to get a new card and modify the deck
export function drawCard(cardsArr) {
  try {
    const [drawnCard, ...cardsAfterDraw] = cardsArr;
    return {
      drawnCard,
      cardsAfterDraw,
      remaining: cardsAfterDraw.length,
    };
  } catch (error) {
    console.error("Error drawing card:", error);
    throw error;
  }
}

// Get exercises and assign suits
export async function getWorkout(type) {
  try {
    const shuffledSuits = shuffleSuits();

    const res = await axios.get(`/api/get/workout`, { params: { type } });
    console.log("Fetched workout:", res);
    const workout = res.data.workout;

    const { numberExercises, royalExercises, aceExercises } = workout.exercises;

    return {
      numberExercises: assignSuit(numberExercises, shuffledSuits),
      royalExercises: assignSuit(royalExercises, shuffledSuits),
      aceExercises: assignSuit(aceExercises, shuffledSuits),
    };
  } catch (error) {
    console.error("Error fetching workout:", error);
    throw error;
  }
}

// Function to get an exercise by card
export function getExerciseByCard(card, pool, multiplier) {
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

export async function registerUser(email, password) {
  try {
    const response = await axios.post("/api/register", { email, password });
    return response;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
}
