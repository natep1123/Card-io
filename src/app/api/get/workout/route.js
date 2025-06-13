import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Workout from "@/models/Workout";

// This route handles getting a new shuffled deck id from the cards API
export async function GET(req) {
  try {
    // Extract workout type
    const { searchParams } = new URL(req.url);
    const workoutType = searchParams.get("type");

    // Connect to the database
    await connectDB();

    // Fetch the workout from the database
    const res = await Workout.findOne({
      type: workoutType,
    });

    return NextResponse.json({ workout: res }, { status: 200 });
  } catch (error) {
    console.error("Error fetching workout:", error);
    return NextResponse.json(
      { message: "An error occurred fetching the workout." },
      { status: 500 }
    );
  }
}
