// This file contains the exercises for the card game.

/* Each suit represents a muscle group:
    Clubs: Push
    Diamonds: Pull
    Hearts: Legs
    Spades: Core 
*/

const exercises = {
  clubs: [
    { name: "Pushups", unit: "reps" },
    { name: "Decline Pushups", unit: "reps" },
    { name: "Diamond Pushups", unit: "reps" },
    { name: "Archer Pushups", unit: "reps" },
    { name: "Clap Pushups", unit: "reps" },
  ],
  diamonds: [
    { name: "Pull-Ups", unit: "reps" },
    { name: "Chin-Ups", unit: "reps" },
    { name: "Horizontal Rows", unit: "reps" },
    { name: "Archer Pullups", unit: "reps per side" },
  ],
  hearts: [
    { name: "Bodyweight Squats", unit: "reps" },
    { name: "Lunges", unit: "reps per leg" },
    { name: "Jump Squats", unit: "reps" },
    { name: "Reverse Lunges", unit: "reps per leg" },
  ],
  spades: [
    { name: "Hanging Leg Raises", unit: "reps" },
    { name: "Russian Twists", unit: "reps per side" },
    { name: "Plank", unit: "seconds" },
    { name: "Side Plank", unit: "seconds per side" },
  ],
};

// Beginner Exercises
const beginner = {
  clubs: [
    { name: "Pushups" },
    { name: "Wide Pushups" },
    { name: "Decline Pushups" },
  ],
  diamonds: [
    { name: "Doorframe Rows" },
    { name: "Negative Pull-Ups" },
    { name: "Towel Rows" },
  ],
  hearts: [
    { name: "Bodyweight Squats" },
    { name: "Lunges" },
    { name: "Calf Raises" },
  ],
  spades: [
    { name: "Plank" },
    { name: "Bicycle Crunches" },
    { name: "Leg Raises" },
  ],
};

// Intermediate Exercises
const intermediate = {
  clubs: [
    { name: "Diamond Pushups" },
    { name: "Archer Pushups" },
    { name: "Pike Pushups" },
  ],
  diamonds: [
    { name: "Pull-Ups" },
    { name: "Chin-Ups" },
    { name: "Horizontal Rows" },
  ],
  hearts: [
    { name: "Jump Squats" },
    { name: "Split Squats" },
    { name: "Step-Ups" },
  ],
  spades: [
    { name: "Side Plank" },
    { name: "Russian Twists" },
    { name: "Hanging Knee Raises" },
  ],
};

// Advanced Exercises
const advanced = {
  clubs: [
    { name: "Clap Pushups" },
    { name: "One-Arm Pushups" },
    { name: "Handstand Pushups" },
  ],
  diamonds: [
    { name: "Weighted Pull-Ups" },
    { name: "Archer Rows" },
    { name: "Explosive Pull-Ups" },
  ],
  hearts: [
    { name: "Pistol Squats" },
    { name: "Bulgarian Split Squats" },
    { name: "Jump Lunges" },
  ],
  spades: [
    { name: "Dragon Flag" },
    { name: "Hanging Leg Raises" },
    { name: "V-Ups" },
  ],
};
