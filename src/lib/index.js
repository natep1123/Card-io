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

// Function to register a new user
export async function registerUser(email, password) {
  try {
    const response = await axios.post("/api/register", { email, password });
    return response;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
}

// Function to save workout stats
export async function saveStats(formattedStats) {
  try {
    return await axios.post("/api/save/stats", formattedStats);
  } catch (error) {
    console.error("Error saving stats:", error);
    throw error;
  }
}

// Function to parse workout stats and sort them (for summary table)
export function parseStats(stats) {
  // Parse wStats into an array of exercise objects'
  const exerciseList = Object.entries(stats).map(([key, reps]) => {
    const parts = key.split("-");
    const group = parts.pop(); // Last part is group
    const suit = parts.pop(); // Second-to-last part is suit
    const name = parts.join("-"); // Everything else is the name
    return {
      name,
      group,
      suit,
      reps: typeof reps === "string" ? parseInt(reps, 10) : reps,
    };
  });

  // Define group order
  const groupOrder = ["push", "pull", "legs", "core", "timed"];

  // Sort exercises by group order and then by reps (descending)
  exerciseList.sort((a, b) => {
    const groupA = groupOrder.indexOf(a.group);
    const groupB = groupOrder.indexOf(b.group);
    if (groupA !== groupB) {
      return groupA - groupB; // Sort by group order
    }
    return b.reps - a.reps; // Sort by reps (highest to lowest)
  });

  return exerciseList;
}

export function formatStats(wStats, wTotals, deckSize, finalTime) {
  const parsedStats = parseStats(wStats);
  const parsedTotals = parseStats(wTotals);
  const groups = ["push", "pull", "legs", "core"]; //exclude timed
  const completedByGroup = {};
  const totalByGroup = {};

  // Initialize group totals
  groups.forEach((group) => {
    completedByGroup[group] = 0;
    totalByGroup[group] = 0;
  });

  // Calculate completed and total reps by group
  parsedStats.forEach(({ group, reps }) => {
    if (groups.includes(group)) {
      completedByGroup[group] += reps;
    }
  });
  parsedTotals.forEach(({ group, reps }) => {
    if (groups.includes(group)) {
      totalByGroup[group] += reps;
    }
  });

  // Calculate overall completed and total reps
  const overallCompleted = Object.values(completedByGroup).reduce(
    (sum, count) => sum + count,
    0
  );
  const overallTotal = Object.values(totalByGroup).reduce(
    (sum, count) => sum + count,
    0
  );

  const formattedStats = {
    stats: {
      push: {
        completed: completedByGroup.push,
        total: totalByGroup.push,
        percentage: parseFloat(
          ((completedByGroup.push / totalByGroup.push) * 100).toFixed(1)
        ),
      },
      pull: {
        completed: completedByGroup.pull,
        total: totalByGroup.pull,
        percentage: parseFloat(
          ((completedByGroup.pull / totalByGroup.pull) * 100).toFixed(1)
        ),
      },
      legs: {
        completed: completedByGroup.legs,
        total: totalByGroup.legs,
        percentage: parseFloat(
          ((completedByGroup.legs / totalByGroup.legs) * 100).toFixed(1)
        ),
      },
      core: {
        completed: completedByGroup.core,
        total: totalByGroup.core,
        percentage: parseFloat(
          ((completedByGroup.core / totalByGroup.core) * 100).toFixed(1)
        ),
      },
      overall: {
        completed: overallCompleted,
        total: overallTotal,
        percentage: parseFloat(
          ((overallCompleted / overallTotal) * 100).toFixed(1)
        ),
      },
    },
    deckSize: deckSize,
    workoutType: "original",
    totalTime: finalTime,
  };
  return formattedStats;
}
