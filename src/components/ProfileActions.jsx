"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getInsights, deleteUser } from "@/lib";
import { useRouter } from "next/navigation";
// import { useWorkoutContext } from "@/contexts/WorkoutContext";
// TODO: sync with workoutContext. It returns the multipler (test value) no issue, but the other values and functions return undefined, causing rendering issues depsite successful API calls. For now, insights will lack persistece across page reloads, but will still work as intended. This is a temporary fix until the context issue is resolved.

export default function ProfileActions() {
  // const { multiplier, insights, setInsights, insightsData, setInsightsData } =
  //   useWorkoutContext();
  const [insights, setInsights] = useState(null);
  const [insightsData, setInsightsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState("...");
  const [message, setMessage] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  // console.log("Multiplier:", multiplier);
  // console.log("Insights:", insights);
  // console.log("setInsights:", setInsights);
  // console.log("Insights Data:", insightsData);
  // console.log("setInsightsData:", setInsightsData);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setDots((prev) => (prev.length < 3 ? prev + "." : "."));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [loading]);

  async function handleGetInsights() {
    setLoading(true);
    setMessage(null);
    const res = await getInsights();
    if (res.status === "success") {
      //Reset here in case user reaches API limit, they can still see the last generated response
      setInsights(null);
      setInsightsData(null);
      // Set data
      setInsights(res.data.insights);
      setInsightsData(res.data.userData);
    }
    setMessage(res.data.message);
    setLoading(false);
  }

  async function handleDelete() {
    const confirmDelete = window.confirm(
      "IN DEVELOPMENT: Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmDelete) return;
    if (confirmDelete) {
      setDeleting(true);
      const res = await deleteUser();

      if (res.status === "failed") {
        setDeleting(false);
        alert(
          "An error occurred while deleting your account. Please try again later."
        );
        return;
      } else {
        setDeleting(false);
        alert("Account deleted successfully.");
        router.push("/");
      }
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full items-center max-w-2xl">
      <Link
        href="/profile/analytics"
        className="px-4 py-2 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition"
      >
        View Analytics
      </Link>
      <div className="flex flex-col items-center gap-4 border border-gray-500 p-4 rounded-lg bg-gray-800 border border-gray-700">
        <div
          className={`flex flex-col gap-2 items-center ${
            insights ? "border-b border-gray-600" : null
          }`}
        >
          <h4 className="text-xl font-semibold">AI Insights</h4>
          <p className="text-white text-center">
            Click the button below to generate AI insights based on your saved
            workout data. This feature analyzes your performance across the most
            recent saved workouts (up to 5) and generates 2 personalized
            workouts you can do to help improve your performance.
          </p>
          <span className="text-gray-500 text-sm">Limit 2 per day.</span>
          <button
            onClick={handleGetInsights}
            disabled={loading || deleting}
            className={`px-4 py-2 bg-blue-700 rounded-lg cursor-pointer hover:bg-blue-600 transition max-w-xs ${
              insights ? "mb-4" : null
            }`}
          >
            {insights ? "Regenerate" : "Generate AI Insights"}
          </button>
        </div>
        {loading && <p className="text-gray-500">Loading insights{dots}</p>}
        {message && <p className="text-gray-500">{message}</p>}
        {insightsData && (
          <div className="flex flex-col gap-2 w-full">
            <p className="text-left text-xl font-semibold">
              Data from {insightsData.sessions} workouts.
            </p>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="py-2 px-4">Group</th>
                  <th className="py-2 px-4">Reps Completed</th>
                  <th className="py-2 px-4">Total Reps</th>
                  <th className="py-2 px-4">Completion %</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="py-2 px-4">Push</td>
                  <td className="py-2 px-4 capitalize">
                    {insightsData.push.completed}
                  </td>
                  <td className="py-2 px-4 capitalize">
                    {insightsData.push.total}
                  </td>
                  <td className="py-2 px-4 capitalize">
                    {insightsData.push.percentage}%
                  </td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 px-4">Pull</td>
                  <td className="py-2 px-4 capitalize">
                    {insightsData.pull.completed}
                  </td>
                  <td className="py-2 px-4 capitalize">
                    {insightsData.pull.total}
                  </td>
                  <td className="py-2 px-4 capitalize">
                    {insightsData.pull.percentage}%
                  </td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 px-4">Legs</td>
                  <td className="py-2 px-4 capitalize">
                    {insightsData.legs.completed}
                  </td>
                  <td className="py-2 px-4 capitalize">
                    {insightsData.legs.total}
                  </td>
                  <td className="py-2 px-4 capitalize">
                    {insightsData.legs.percentage}%
                  </td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 px-4">Core</td>
                  <td className="py-2 px-4 capitalize">
                    {insightsData.core.completed}
                  </td>
                  <td className="py-2 px-4 capitalize">
                    {insightsData.core.total}
                  </td>
                  <td className="py-2 px-4 capitalize">
                    {insightsData.core.percentage}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {insights && (
          <div className="bg-gray-800 rounded-l flex flex-col gap-4">
            <p>{insights.insight}</p>
            <div className="flex flex-col gap-2">
              <p>
                <strong>Warmup:</strong> {insights.warmup}
              </p>
              <p>
                <strong>Cooldown:</strong> {insights.cooldown}
              </p>
              <p className="text-red-500">
                <strong>Safety Note:</strong> {insights.safetyNote}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-lg font-semibold">Suggested Workouts:</h4>
              {insights.workouts.map((workout, index) => {
                const workoutText = `Workout #${index + 1}: ${workout.name}
                Muscle Groups: ${workout.muscleGroup}
                ${workout.exercises
                  .map(
                    (e, i) =>
                      `${i + 1}. ${e.name} - ${e.sets} sets of ${
                        e.reps
                      } reps (${e.rest} rest)`
                  )
                  .join("\n")}
                  Tip: ${workout.tip}`;

                return (
                  <div
                    key={index}
                    className="flex flex-col gap-2 w-full border border-gray-600 p-3 rounded-lg p-4 cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(workoutText);
                      alert(`Copied Workout #${index + 1} to clipboard!`);
                    }}
                  >
                    <p className="text-sm italic text-center">Click to Copy!</p>
                    <h5 className="text-lg font-semibold">
                      #{index + 1}. {workout.name}
                    </h5>
                    <p>Muscle Groups: {workout.muscleGroup}</p>
                    <ul className="list-disc pl-5">
                      {workout.exercises.map((exercise, idx) => (
                        <li key={idx}>
                          {exercise.name} - {exercise.sets} sets of{" "}
                          {exercise.reps} reps ({exercise.rest} rest)
                        </li>
                      ))}
                    </ul>
                    <p className="italic">Tip: {workout.tip}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <button
        onClick={handleDelete}
        className="px-4 py-2 bg-red-700 rounded-lg cursor-pointer hover:bg-red-600 transition"
      >
        {deleting ? "Deleting" : "Delete Account"}
      </button>
    </div>
  );
}
