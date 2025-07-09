import { connectDB } from "@/lib/db";
import { getUserModel } from "@/models/User";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { signOut } from "@/auth";

// This route handles the deletion of a user account and all associated scores.
export async function DELETE(req) {
  try {
    // Get user ID from session
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    await connectDB();
    const User = getUserModel();

    // Ensure user exists
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Delete the user
    await User.findByIdAndDelete(userId);

    // Sign out the user
    await signOut({ redirect: false });

    return NextResponse.json(
      { message: "Account deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { message: "An error occurred while deleting the account." },
      { status: 500 }
    );
  }
}
