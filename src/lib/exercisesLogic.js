// This file contains the logic for getting 3 random exercises per group (push, pull, legs, core) and assigning a suit to each exercise.
// Each suit will have 3 random exercises (1 for number cards, 1 for royal cards, and 1 for aces).
// Example: 2H = 2 Standard Pushups, KH = 10 Clap Pullups, AH = 15 Decline Pushups

import { exercisesByGroup, timeChallenges } from "@/lib/exercisesDb";

// Variables
const groups = Object.keys(exercisesByGroup); // Push, pull, legs, core
const { challenges, times } = timeChallenges; // Time challenges
let suits = ["hearts", "diamonds", "clubs", "spades"]; // Card suits
const uniqueExercises = [];

// Get a random exercise from a specific group
function getRandomExercise(group, db) {
  const groupExercises = db[group];
  if (!groupExercises || !groupExercises.length) return null;
  const randomIndex = Math.floor(Math.random() * groupExercises.length);
  return groupExercises[randomIndex];
}

// Get a random exercise for all groups
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
  return selectedExercises.filter(Boolean); // Remove nulls
}

// Get 4 random challenges from the time charge (a challenge can be selected twice)
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

// Function to shuffle the suits
function shuffleSuits() {
  const shuffled = [...suits];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Function to assign suits to exercises (exercises from the same group will have the same suit)
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
  const shuffledSuits = shuffleSuits(); // Shuffle the suits

  const numberExercises = getRandomExerciseAll(); // Number cards (2-10)
  const royalExercises = getRandomExerciseAll(); // Royal cards (J, Q, K)
  const aceExercises = getRandomChallenges(); // Ace cards

  return {
    numberExercises: assignSuit(numberExercises, shuffledSuits),
    royalExercises: assignSuit(royalExercises, shuffledSuits),
    aceExercises: assignSuit(aceExercises, shuffledSuits),
  };
}
