import { connectDB } from "@/lib/db";
import { getUserModel } from "@/models/User";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { sampleWorkouts } from "@/lib/sampleWorkoutData";

export async function GET(req) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const userEmail = session.user.email;
  const { searchParams } = new URL(req.url);
  const deckSize = searchParams.get("deckSize");
  const multiplier = Number(searchParams.get("multiplier"));
  const workoutType = searchParams.get("workoutType");
  console.log("REQUEST:", req);

  try {
    // Return sample data for test@example.com
    if (userEmail === "test@example.com") {
      const sample = sampleWorkouts.filter(
        (w) =>
          w.deckSize === deckSize &&
          w.multiplier === multiplier &&
          w.workoutType === workoutType
      );
      return NextResponse.json(
        { message: "Sample stats returned", workouts: sample },
        { status: 200 }
      );
    }

    // Real user logic
    await connectDB();
    const User = getUserModel();
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userWorkouts = user.workoutStats.filter(
      (w) =>
        w.deckSize === deckSize &&
        w.multiplier === multiplier &&
        w.workoutType === workoutType
    );

    return NextResponse.json(
      { message: "User stats returned", workouts: userWorkouts },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch workouts" },
      { status: 500 }
    );
  }
}
