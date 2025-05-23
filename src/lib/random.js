// This file contains the data and logic for generating random exercises for the workout.

// Exercises pool for each group
export const exercisesByGroup = {
  push: [
    { name: "Standard Pushups", unit: "reps", group: "push" },
    { name: "Decline Pushups", unit: "reps", group: "push" },
    { name: "Diamond Pushups", unit: "reps", group: "push" },
    { name: "Archer Pushups", unit: "reps per side", group: "push" },
    { name: "Clap Pushups", unit: "reps", group: "push" },
  ],
  pull: [
    { name: "Pull-Ups", unit: "reps", group: "pull" },
    { name: "Chin-Ups", unit: "reps", group: "pull" },
    { name: "Horizontal Rows", unit: "reps", group: "pull" },
    { name: "Archer Pullups", unit: "reps per side", group: "pull" },
  ],
  legs: [
    { name: "Bodyweight Squats", unit: "reps", group: "legs" },
    { name: "Lunges", unit: "reps per leg", group: "legs" },
    { name: "Jump Squats", unit: "reps", group: "legs" },
    { name: "Reverse Lunges", unit: "reps per leg", group: "legs" },
  ],
  core: [
    { name: "Hanging Leg Raises", unit: "reps", group: "core" },
    { name: "Situps", unit: "reps", group: "core" },
    { name: "Floor Leg Raises", unit: "reps", group: "core" },
    { name: "V-Ups", unit: "reps", group: "core" },
  ],
};

// Exercises pool for timed challenges
export const timedChallenges = {
  challenges: [
    { name: "Rest", unit: "sec", group: "timed" },
    { name: "Plank", unit: "sec", group: "timed" },
    { name: "Russian Twists", unit: "sec", group: "timed" },
    { name: "Mountain Climbers", unit: "sec", group: "timed" },
    {
      name: "Side Plank",
      unit: "sec per side",
      group: "timed",
    },
    { name: "Jumping Jacks", unit: "sec", group: "timed" },
    { name: "Wall Sit", unit: "sec", group: "timed" },
    { name: "Bicycle Crunches", unit: "sec", group: "timed" },
  ],
  times: ["30", "45", "60"],
};

// Variables
const groups = Object.keys(exercisesByGroup); // Push, pull, legs, core
const { challenges, times } = timedChallenges; // Time challenges
let suits = ["hearts", "diamonds", "clubs", "spades"]; // Card suits
const uniqueExercises = []; // To prevent duplicates

// Helper; Get a random exercise from a specific group in a pool of exercises
function getRandomExercise(group, pool) {
  const groupExercises = pool[group];
  if (!groupExercises || !groupExercises.length) return null;
  const randomIndex = Math.floor(Math.random() * groupExercises.length);
  return groupExercises[randomIndex];
}

// Helper; Get a random exercise for all groups
function getRandomExerciseAll() {
  const selectedExercises = groups.map((group) => {
    let exercise = null;
    let attempts = 0;
    const maxAttempts = 10; // Prevent infinite loops
    while (!exercise && attempts < maxAttempts) {
      const ex = getRandomExercise(group, exercisesByGroup);
      if (ex && !uniqueExercises.includes(ex.name)) {
        uniqueExercises.push(ex.name);
        exercise = ex;
      }
      attempts++;
    }
    return exercise;
  });
  return selectedExercises.filter(Boolean); // Remove any nulls
}

// Helper; Get 4 random challenges from the time charge (a challenge can be selected twice)
function getRandomChallenges() {
  const selectedChallenges = [];
  const challengeCounts = {}; // Track count of each challenge

  while (selectedChallenges.length < 4) {
    const randomIndex = Math.floor(Math.random() * challenges.length);
    const challengeName = challenges[randomIndex].name;
    const randomTime = times[Math.floor(Math.random() * times.length)];

    // Initialize count if not exists
    if (!challengeCounts[challengeName]) {
      challengeCounts[challengeName] = 0;
    }

    // Only add if challenge hasn't been used twice
    if (challengeCounts[challengeName] < 2) {
      const challenge = {
        ...challenges[randomIndex],
        time: randomTime,
      };
      selectedChallenges.push(challenge);
      challengeCounts[challengeName]++;
    }
  }
  return selectedChallenges;
}

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
export function getExercises() {
  uniqueExercises.length = 0; // Reset
  const shuffledSuits = shuffleSuits();

  const numberExercises = getRandomExerciseAll(); // Number cards (2-10)
  const royalExercises = getRandomExerciseAll(); // Royal cards (J, Q, K)
  const aceExercises = getRandomChallenges(); // Ace cards

  return {
    numberExercises: assignSuit(numberExercises, shuffledSuits),
    royalExercises: assignSuit(royalExercises, shuffledSuits),
    aceExercises: assignSuit(aceExercises, shuffledSuits),
  };
}

// Function to get an exercise by card
export function getExerciseByCard(card, pool) {
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

  return {
    ...exercise,
    value: ["jack", "queen", "king"].includes(card.value)
      ? 10
      : card.value === "ace"
      ? exercise.time
      : parseInt(card.value, 10),
  };
}
