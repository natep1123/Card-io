"use client";

import { useWorkoutContext } from "@/contexts/WorkoutContext";

export default function WorkoutForm() {
  const { setWState, deckSize, setDeckSize } = useWorkoutContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    setDeckSize(e.target.deckSize.value);
    setWState("workout");
  };

  return (
    <div className="flex flex-col items-center">
      <h2>Choose Your Workout!</h2>
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <label htmlFor="deckSize">Full or Half Deck?</label>
        <select id="deckSize" name="deckSize">
          <option value="full">Full Deck</option>
          <option value="half">Half Deck</option>
        </select>
        <button type="submit">Start Workout</button>
      </form>
    </div>
  );
}
