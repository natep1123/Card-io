import { connectDB } from "@/lib/db";
import { getUserModel } from "@/models/User";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(req) {
  // Auth check; only logged-in users can save stats and view analytics.
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;

  try {
    const { searchParams } = new URL(req.url);
    const color = searchParams.get("color");
    await connectDB();

    const User = getUserModel();

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }
    user.colorPreference = color;
    await user.save();

    return NextResponse.json(
      { message: "Color preference updates.", newColor: color },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch workouts" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
