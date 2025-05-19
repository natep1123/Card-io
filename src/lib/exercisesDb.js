// This file contains the exercises for the workout generator.

// Array of exercises for each suit
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
