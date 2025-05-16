"use client";

import { useWorkoutContext } from "@/contexts/WorkoutContext";

export default function WorkoutForm() {
  const { setWState, setDeckSize } = useWorkoutContext();

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
          <label htmlFor="difficulty" className="text-white font-semibold">
            Difficulty:
          </label>
          <select
            id="diffuculty"
            name="difficulty"
            className="w-full p-2 rounded-md bg-slate text-white cursor-pointer"
          >
            <option value="original" className="bg-black">
              Original
            </option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-md bg-red text-white font-semibold cursor-pointer"
        >
          Start Workout
        </button>
      </form>
    </div>
  );
}
