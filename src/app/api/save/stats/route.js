import { connectDB } from "@/lib/db";
import { getUserModel } from "@/models/User";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

// This route handles saving workout stats for logged-in users
export async function POST(req) {
  try {
    // Auth check; only logged-in users can save stats.
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    await connectDB();

    const formattedStats = await req.json();

    const User = getUserModel();

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    // Push new stats and save
    user.workoutStats.push(formattedStats);
    await user.save();

    return NextResponse.json(
      { message: "Stats saved.", savedStats: formattedStats },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while saving workout stats." },
      { status: 500 }
    );
  }
}
