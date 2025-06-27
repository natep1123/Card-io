"use client";

import { useWorkoutContext } from "@/contexts/WorkoutContext";
import { rerollSuits } from "@/lib/index";

export default function WForm() {
  const { setWState, setDeckSize, exercises, setExercises, setMultiplier } =
    useWorkoutContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    setDeckSize(e.target.deckSize.value);
    setMultiplier(e.target.multiplier.value);
    const wtype = e.target.wtype.value; // placeholder for possible future additional workout types
    setWState("workout");
  };

  const handleReroll = (e) => {
    e.preventDefault();
    setExercises(null); // Set null for preview loading state
    const rerolled = rerollSuits(exercises);
    setTimeout(() => {
      setExercises(rerolled);
    }, 500); // 500ms delay
  };

  return (
    <div className="flex flex-col items-center bg-slate">
      <h2 className="mb-6 text-white">Choose Your Workout!</h2>
      <form
        data-testid="wform"
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
            onChange={(e) => setDeckSize(e.target.value)}
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
          <label htmlFor="wtype" className="text-white font-semibold">
            Workout Type:
          </label>
          <select
            id="wtype"
            name="wtype"
            className="w-full p-2 rounded-md bg-slate text-white cursor-pointer"
          >
            <option value="original" className="bg-black">
              Original
            </option>
          </select>
        </div>
        <div className="flex flex-col items-center gap-2 w-full">
          <label htmlFor="multiplier" className="text-white font-semibold">
            Multiplier:
          </label>
          <select
            id="multiplier"
            name="multiplier"
            onChange={(e) => setMultiplier(e.target.value)}
            className="w-full p-2 rounded-md bg-slate text-white cursor-pointer"
          >
            <option value="1" className="bg-black">
              x1 - Beginner
            </option>
            <option value="2" className="bg-black">
              x2 - Advanced
            </option>
            <option value="3" className="bg-black">
              x3 - Elite
            </option>
          </select>
        </div>
        <button
          onClick={handleReroll}
          className="w-full py-3 rounded-md bg-red text-white font-semibold cursor-pointer hover:bg-red-600 transition"
        >
          Reroll Suits
        </button>
        <button
          type="submit"
          className="w-full py-3 rounded-md bg-green text-white font-semibold cursor-pointer hover:bg-green-600 transition"
        >
          Start Workout
        </button>
      </form>
    </div>
  );
}
