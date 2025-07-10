import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getUserModel } from "@/models/User";
import OpenAI from "openai";
import { auth } from "@/auth";

const client = new OpenAI();

// Helper function to check if two dates are the same day (ignoring time)
function isSameDay(d1, d2) {
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }
  const userId = session.user.id;
  let user; // initialize outside try block to access in catch (rollback apiCalls)

  try {
    // Find user
    await connectDB();
    const User = getUserModel();
    user = await User.findById(userId);

    // If user not found, return 404
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }
    // If user has not completed any workouts, return 404
    if (!user.workoutStats || user.workoutStats.length === 0) {
      return NextResponse.json(
        { message: "No workout stats found." },
        { status: 404 }
      );
    }

    // TEMP: NO API LIMIT FOR TESTING ACCOUNT
    // if (user.email === "testai@example.com") {
    //   user.apiCalls = 0;
    // }

    // // API Limits: user can send two calls per day
    if (user.apiCalls >= 2 && isSameDay(user.lastApiCall, new Date())) {
      return NextResponse.json(
        { message: "API call limit reached. Please try again tomorrow." },
        { status: 429 }
      );
    } else {
      // Reset apiCalls if it's a new day
      if (!isSameDay(user.lastApiCall, new Date())) {
        user.apiCalls = 0;
      }
      user.apiCalls += 1;
      user.lastApiCall = Date.now();
      await user.save();
      console.log("API call count updated:", user.apiCalls);
    }

    // Retrieve the most recent workout stats (up to 5)
    const workoutStats = user.workoutStats;

    if (workoutStats.length === 0) {
      return NextResponse.json(
        { message: "No workout stats found for this user." },
        { status: 404 }
      );
    }
    const latestWorkouts = workoutStats
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 5);

    // Calculate the average completion percentage for each muscle group
    const userData = {
      push: { completed: 0, total: 0, percentage: 0 },
      pull: { completed: 0, total: 0, percentage: 0 },
      legs: { completed: 0, total: 0, percentage: 0 },
      core: { completed: 0, total: 0, percentage: 0 },
      sessions: latestWorkouts.length,
      multipliers: [],
      deckSizes: [],
    };
    latestWorkouts.forEach((workout) => {
      userData.push.completed += workout.stats.push.completed;
      userData.push.total += workout.stats.push.total;
      userData.push.percentage =
        userData.push.total > 0
          ? ((userData.push.completed / userData.push.total) * 100).toFixed(1)
          : 0;
      userData.pull.completed += workout.stats.pull.completed;
      userData.pull.total += workout.stats.pull.total;
      userData.pull.percentage =
        userData.pull.total > 0
          ? ((userData.pull.completed / userData.pull.total) * 100).toFixed(1)
          : 0;
      userData.legs.completed += workout.stats.legs.completed;
      userData.legs.total += workout.stats.legs.total;
      userData.legs.percentage =
        userData.legs.total > 0
          ? ((userData.legs.completed / userData.legs.total) * 100).toFixed(1)
          : 0;
      userData.core.completed += workout.stats.core.completed;
      userData.core.total += workout.stats.core.total;
      userData.core.percentage =
        userData.core.total > 0
          ? ((userData.core.completed / userData.core.total) * 100).toFixed(1)
          : 0;
      userData.multipliers.push(workout.multiplier);
      userData.deckSizes.push(workout.deckSize);
    });

    const prompt = `
    You are a fitness AI. Based on the user’s workout completion data, generate 2 personalized workouts targeting push, pull, legs, and core that each contain 5-8 exercises. Prioritize balancing muscle groups, addressing underworked areas, and matching the user’s fitness level. For each generated workout, include the exercises with sets, reps, and rest. Keep it practical and safe with a focus on simple exercises that can be done with minimal equipment or at a standard gym with basic equipment. Include motivational tips and a brief warmup and cooldown routine.

    **Workout Challenge Context**:
    - The challenge is based on a deck of cards, where each suit represents a muscle group and the user can choose full/half deck sizes (52/26 cards) and a multiplier (x1/x2/x3) for increasing difficulty.
    - Users that engage with full decks and higher multipliers are more likely to be advanced, while those with half decks and lower multipliers are likely beginners or intermediates. Users can be anywhere in between, so it's important to assess their individual performance and preferences.
    - The user has completed a series of workouts, and we want to provide insights based on their performance and suggest new workouts based on their data to help them improve.
    - If the data is empty or incomplete, generate 2 full-body workouts that include exercises for all 4 muscle groups: push, pull, legs, and core.

    **User Data**: 
    - Note: This data is compiled from the most recent ${
      userData.sessions
    } workouts. Their associated multipliers and deck sizes are respectively [${userData.multipliers.join(
      ", "
    )}] and [${userData.deckSizes.join(", ")}].
    - Push: User completed ${userData.push.completed} out of ${
      userData.push.total
    } reps (${userData.push.percentage}% completion).
    - Pull: User completed ${userData.pull.completed} out of ${
      userData.pull.total
    } reps (${userData.pull.percentage}% completion).
    - Legs: User completed ${userData.legs.completed} out of ${
      userData.legs.total
    } reps (${userData.legs.percentage}% completion).
    - Core: User completed ${userData.core.completed} out of ${
      userData.core.total
    } reps (${userData.core.percentage}% completion).

    **Output Format (JSON)**:
    {
      "workouts": [
        {
          "name": "[Workout Name (e.g., "Push Endurance", "Pull Strength", "Core Burner")]",
          "muscleGroup": "[Push/Pull/Legs/Core (choose 2 or 3)]",
          "exercises": [
            {
              "name": "[Exercise Name]", // String
              "sets": [Number], // Must be a pure number e.g. 3
              "reps": [Number], // Must be a pure number e.g. 10 with no comments
              "rest": "[Rest Time]" // String
            }
          ],
          "tip": "[Motivational tip]"
        }
      ],
      "insight": "[Brief greeting followed by analysis of user’s data and how the workouts address their needs (e.g. "Greetings! Your data shows strong core completion and solid pull effort, but push and especially legs are currently underworked. These workouts emphasize push and leg development while maintaining your strong core and pulling routines, aiming for full-body balance and improvement.")]",
      "warmup": "[Brief warmup routine (e.g. "10 minutes of dynamic stretching.")]",
      "cooldown": "[Brief cooldown routine (e.g. "10 minutes of static stretching and mobility work.")]",
      "safetyNote": "[Any safety considerations based on user data (e.g. "Ensure proper form to avoid injury, especially with high rep counts.")]"
    };

    **Instructions**:
    - Return only the output text in the specified JSON format, without any additional commentary or explanation.
    - Ensure all numerical fields contain only numbers. Do not include parenthetical notes or extra text within any JSON value.
    - If any exercise needs a comment, add it in the exercise name (e.g. "Reverse Lunges (each leg)").
  `;

    const response = await client.responses.create({
      model: "gpt-4.1",
      input: prompt,
    });

    const insights = JSON.parse(response.output[0].content[0].text);

    // Return the insights and userData
    return NextResponse.json(
      {
        message: "AI insights generated successfully.",
        insights: insights,
        userData: userData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Route Error:", error);
    let message = "Failed to generate insights.";

    if (error.message.includes("SyntaxError")) {
      message = "Bad response from AI. Please try again.";
      user.apiCalls -= 1; // Rollback API call count for bad responses
      await user.save();
      console.log("API call count rolled back:", user.apiCalls);
    }
    return NextResponse.json({ message: message }, { status: 500 });
  }
}
