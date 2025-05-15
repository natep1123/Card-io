// This file contains the exercises for the workout generator.

// Array of exercises for each suit
export const exercises = {
  push: [
    { name: "Standard Pushups", unit: "reps" },
    { name: "Decline Pushups", unit: "reps" },
    { name: "Diamond Pushups", unit: "reps" },
    { name: "Archer Pushups", unit: "reps" },
    { name: "Clap Pushups", unit: "reps" },
  ],
  pull: [
    { name: "Pull-Ups", unit: "reps" },
    { name: "Chin-Ups", unit: "reps" },
    { name: "Horizontal Rows", unit: "reps" },
    { name: "Archer Pullups", unit: "reps per side" },
  ],
  legs: [
    { name: "Bodyweight Squats", unit: "reps" },
    { name: "Lunges", unit: "reps per leg" },
    { name: "Jump Squats", unit: "reps" },
    { name: "Reverse Lunges", unit: "reps per leg" },
  ],
  core: [
    { name: "Hanging Leg Raises", unit: "reps" },
    { name: "Russian Twists", unit: "reps per side" },
    { name: "Plank", unit: "seconds" },
    { name: "Side Plank", unit: "seconds per side" },
  ],
};

/* BELOW ARE POSSIBLE FUTURE ADDITIONS FOR DYNAMIC DIFFICULTY */

// Beginner Exercises
const beginner = {
  push: [
    { name: "Pushups" },
    { name: "Wide Pushups" },
    { name: "Decline Pushups" },
  ],
  pull: [
    { name: "Doorframe Rows" },
    { name: "Negative Pull-Ups" },
    { name: "Towel Rows" },
  ],
  legs: [
    { name: "Bodyweight Squats" },
    { name: "Lunges" },
    { name: "Calf Raises" },
  ],
  core: [
    { name: "Plank" },
    { name: "Bicycle Crunches" },
    { name: "Leg Raises" },
  ],
};

// Intermediate Exercises
const intermediate = {
  push: [
    { name: "Diamond Pushups" },
    { name: "Archer Pushups" },
    { name: "Pike Pushups" },
  ],
  pull: [
    { name: "Pull-Ups" },
    { name: "Chin-Ups" },
    { name: "Horizontal Rows" },
  ],
  legs: [
    { name: "Jump Squats" },
    { name: "Split Squats" },
    { name: "Step-Ups" },
  ],
  core: [
    { name: "Side Plank" },
    { name: "Russian Twists" },
    { name: "Hanging Knee Raises" },
  ],
};

// Advanced Exercises
const advanced = {
  push: [
    { name: "Clap Pushups" },
    { name: "One-Arm Pushups" },
    { name: "Handstand Pushups" },
  ],
  pull: [
    { name: "Weighted Pull-Ups" },
    { name: "Archer Rows" },
    { name: "Explosive Pull-Ups" },
  ],
  legs: [
    { name: "Pistol Squats" },
    { name: "Bulgarian Split Squats" },
    { name: "Jump Lunges" },
  ],
  core: [
    { name: "Dragon Flag" },
    { name: "Hanging Leg Raises" },
    { name: "V-Ups" },
  ],
};
