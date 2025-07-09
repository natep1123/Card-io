import mongoose from "mongoose";

// Schema for individual workout stats
const workoutStatsSchema = new mongoose.Schema(
  {
    stats: {
      push: {
        completed: { type: Number, default: 0, min: 0 },
        total: { type: Number, default: 0, min: 0 },
        percentage: { type: Number, default: 0, min: 0, max: 100 },
      },
      pull: {
        completed: { type: Number, default: 0, min: 0 },
        total: { type: Number, default: 0, min: 0 },
        percentage: { type: Number, default: 0, min: 0, max: 100 },
      },
      legs: {
        completed: { type: Number, default: 0, min: 0 },
        total: { type: Number, default: 0, min: 0 },
        percentage: { type: Number, default: 0, min: 0, max: 100 },
      },
      core: {
        completed: { type: Number, default: 0, min: 0 },
        total: { type: Number, default: 0, min: 0 },
        percentage: { type: Number, default: 0, min: 0, max: 100 },
      },
      overall: {
        completed: { type: Number, default: 0, min: 0 },
        total: { type: Number, default: 0, min: 0 },
        percentage: { type: Number, default: 0, min: 0, max: 100 },
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
    multiplier: {
      type: Number,
      enum: [1, 2, 3],
      default: 1,
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
    colorPreference: {
      type: String,
      enum: ["red", "blue", "yellow", "green", "white"],
      default: "red",
    },
    apiCalls: {
      type: Number,
      default: 0,
    },
    lastApiCall: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const getUserModel = () =>
  mongoose.models.User || mongoose.model("User", userSchema);
