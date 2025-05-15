import Workout from "@/components/workout/Workout";
import { getExercises } from "@/lib/exercisesLogic";
import { getShuffledDeck } from "@/lib/cardsApi";
import { WorkoutProvider } from "@/contexts/WorkoutContext";

export default async function WorkoutPage() {
  // Get a shuffled deck of cards
  const deck = await getShuffledDeck();

  // Get three sets of random exercises for all suits (number cards, royal cards, and aces)
  const exercises = getExercises();

  console.log("EXERCISES", exercises);

  return (
    <main className="flex flex-col items-center">
      <h2>Select Your Challenge!</h2>
      <WorkoutProvider deck={deck} exercises={exercises}>
        <Workout />
      </WorkoutProvider>
    </main>
  );
}
