// This file contains the logic for getting 3 random exercises per group (push, pull, legs, core) and assigning a suit to each exercise.
// Each suit will have 3 random exercises (1 for number cards, 1 for royal cards, and 1 for aces).
// Example: 2H = 2 Standard Pushups, KH = 10 Clap Pullups, AH = 15 Decline Pushups

import { exercises } from "@/lib/exercisesDb";

// Variables
const groups = Object.keys(exercises); // Push, pull, legs, core
let suits = ["hearts", "diamonds", "clubs", "spades"]; // Card suits
const uniqueExercises = [];

// Get a random exercise from a specific group
function getRandomExercise(group) {
  const groupExercises = exercises[group];
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
      const ex = getRandomExercise(group);
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

// Function to shuffle the suits
function shuffleSuits() {
  const shuffled = [...suits];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

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
  const aceExercises = getRandomExerciseAll(); // Ace cards

  return {
    numberExercises: assignSuit(numberExercises, shuffledSuits),
    royalExercises: assignSuit(royalExercises, shuffledSuits),
    aceExercises: assignSuit(aceExercises, shuffledSuits),
  };
}
