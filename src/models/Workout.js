import mongoose from "mongoose";

// Exercise subdocument schema
const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
      enum: ["reps", "seconds"],
    },
    group: {
      type: String,
      required: true,
      enum: ["push", "pull", "legs", "core", "timed"],
    },
  },
  { _id: false }
);

// Main workout schema
const workoutSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    exercises: {
      numberExercises: [exerciseSchema],
      royalExercises: [exerciseSchema],
      aceExercises: [exerciseSchema],
    },
  },
  {
    timestamps: true,
  }
);

const Workout =
  mongoose.models.Workout || mongoose.model("Workout", workoutSchema);
export default Workout;
