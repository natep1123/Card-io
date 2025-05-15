import Workout from "@/components/workout/Workout";
import { WorkoutProvider } from "@/contexts/WorkoutContext";

export default async function WorkoutPage() {
  return (
    <main className="flex flex-col items-center">
      <WorkoutProvider>
        <Workout />
      </WorkoutProvider>
    </main>
  );
}
