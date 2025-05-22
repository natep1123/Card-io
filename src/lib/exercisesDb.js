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
