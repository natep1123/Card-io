import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import WForm from "../components/workout/WForm";
import { useWorkoutContext } from "@/contexts/WorkoutContext";
import { rerollSuits } from "@/lib/index";

// Mock the workout context
jest.mock("@/contexts/WorkoutContext");

// Mock the rerollSuits function
jest.mock("@/lib/index", () => ({
  rerollSuits: jest.fn(),
}));

describe("WForm", () => {
  const mockSetWState = jest.fn();
  const mockSetDeckSize = jest.fn();
  const mockSetExercises = jest.fn();
  const mockSetMultiplier = jest.fn();
  const mockExercises = [
    { suit: "hearts", name: "push-ups", unit: "reps", group: "push" },
    { suit: "diamonds", name: "squats", unit: "reps", group: "legs" },
  ];

  beforeEach(() => {
    jest.useFakeTimers();
    useWorkoutContext.mockReturnValue({
      setWState: mockSetWState,
      setDeckSize: mockSetDeckSize,
      exercises: mockExercises,
      setExercises: mockSetExercises,
      setMultiplier: mockSetMultiplier,
    });
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("renders the workout form with all elements", () => {
    render(<WForm />);
    expect(screen.getByText("Choose Your Workout!")).toBeInTheDocument();
    expect(screen.getByLabelText("Full or Half Deck?")).toBeInTheDocument();
    expect(screen.getByLabelText("Workout Type:")).toBeInTheDocument();
    expect(screen.getByLabelText("Multiplier:")).toBeInTheDocument();
    expect(screen.getByText("Reroll Suits")).toBeInTheDocument();
    expect(screen.getByText("Start Workout")).toBeInTheDocument();
  });

  it("renders default select options", () => {
    render(<WForm />);
    expect(screen.getByText("Full Deck")).toBeInTheDocument();
    expect(screen.getByText("Half Deck")).toBeInTheDocument();
    expect(screen.getByText("Original")).toBeInTheDocument();
    expect(screen.getByText("x1 - Beginner")).toBeInTheDocument();
    expect(screen.getByText("x2 - Advanced")).toBeInTheDocument();
    expect(screen.getByText("x3 - Elite")).toBeInTheDocument();
  });

  it("calls setMultiplier when multiplier selection changes", () => {
    render(<WForm />);
    const multiplierSelect = screen.getByLabelText("Multiplier:");
    fireEvent.change(multiplierSelect, { target: { value: "2" } });
    expect(mockSetMultiplier).toHaveBeenCalledWith("2");
  });

  it("handles reroll suits functionality", async () => {
    const rerolledExercises = [
      { suit: "clubs", name: "dips", unit: "reps", group: "push" },
      { suit: "spades", name: "lunges", unit: "reps", group: "legs" },
    ];
    rerollSuits.mockReturnValue(rerolledExercises);

    // Reapply mock with non-null exercises (to avoid null during execution)
    useWorkoutContext.mockReturnValue({
      setWState: mockSetWState,
      setDeckSize: mockSetDeckSize,
      exercises: mockExercises, // not null
      setExercises: mockSetExercises,
      setMultiplier: mockSetMultiplier,
    });

    render(<WForm />);
    const rerollButton = screen.getByText("Reroll Suits");
    fireEvent.click(rerollButton);

    expect(mockSetExercises).toHaveBeenCalledWith(null);
    expect(rerollSuits).toHaveBeenCalledWith(mockExercises);

    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    await waitFor(() => {
      expect(mockSetExercises).toHaveBeenCalledWith(rerolledExercises);
    });
  });
});
