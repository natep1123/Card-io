"use client";

import { useWorkoutContext } from "@/contexts/WorkoutContext";
import { getExercises } from "@/lib/exercisesLogic";

export default function WorkoutForm() {
  const { setWState, setDeckSize, setExercises } = useWorkoutContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDeckSize(e.target.deckSize.value);
    setWState("workout");
  };

  return (
    <div className="flex flex-col items-center bg-slate">
      <h2 className="mb-6 text-white">Choose Your Workout!</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 p-6 rounded-lg bg-black border border-white w-full max-w-sm shadow-lg shadow-green-400/40"
      >
        <div className="flex flex-col items-center gap-2 w-full">
          <label htmlFor="deckSize" className="text-white font-semibold">
            Full or Half Deck?
          </label>
          <select
            id="deckSize"
            name="deckSize"
            className="w-full p-2 rounded-md bg-slate text-white cursor-pointer"
          >
            <option value="full" className="bg-black">
              Full Deck
            </option>
            <option value="half" className="bg-black">
              Half Deck
            </option>
          </select>
        </div>
        <div className="flex flex-col items-center gap-2 w-full">
          <label htmlFor="difficulty" className="text-white font-semibold">
            Difficulty:
          </label>
          <select
            id="difficulty"
            name="difficulty"
            className="w-full p-2 rounded-md bg-slate text-white cursor-pointer"
          >
            <option value="original" className="bg-black">
              Original
            </option>
          </select>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            const exercisesRes = getExercises();
            setExercises(exercisesRes);
          }}
          className="w-full py-3 rounded-md bg-green text-white font-semibold cursor-pointer hover:bg-green-600 transition"
        >
          Reroll Exercises
        </button>
        <button
          type="submit"
          className="w-full py-3 rounded-md bg-red text-white font-semibold cursor-pointer hover:bg-red-600 transition"
        >
          Start Workout
        </button>
      </form>
    </div>
  );
}
