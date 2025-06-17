import mongoose from "mongoose";

// Schema for individual workout stats
const workoutStatsSchema = new mongoose.Schema(
  {
    stats: {
      push: {
        completed: { type: Number, default: 0, min: 0 },
        total: { type: Number, default: 0, min: 0 },
      },
      pull: {
        completed: { type: Number, default: 0, min: 0 },
        total: { type: Number, default: 0, min: 0 },
      },
      legs: {
        completed: { type: Number, default: 0, min: 0 },
        total: { type: Number, default: 0, min: 0 },
      },
      core: {
        completed: { type: Number, default: 0, min: 0 },
        total: { type: Number, default: 0, min: 0 },
      },
    },
    deckSize: {
      type: String,
      enum: ["full", "half"],
      default: "full",
    },
    workoutType: {
      type: String,
      enum: ["original"],
      default: "original",
    },
    totalTime: { type: String }, // Total time, formatted as "HH:MM:SS"
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

// Main user schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    workoutStats: [workoutStatsSchema],
  },
  {
    timestamps: true,
  }
);

export const getUserModel = () =>
  mongoose.models.User || mongoose.model("User", userSchema);
