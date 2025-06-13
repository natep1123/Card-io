import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../src/app/page";
import { expect } from "@testing-library/jest-dom";

describe("Home Page", () => {
  test("renders welcome message and intro text", () => {
    render(<Home />);
    expect(screen.getByText("Welcome to Card-io!")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Ready to take a gamble on an intense workout challenge?"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("Simple to play, but hard to master.")
    ).toBeInTheDocument();
  });

  test("renders Workout and How Does It Work buttons with correct links", () => {
    render(<Home />);
    const workoutButton = screen.getByText("Workout");
    const aboutButton = screen.getByText("How Does It Work?");

    expect(workoutButton).toBeInTheDocument();
    expect(workoutButton.closest("a")).toHaveAttribute("href", "/workout");
    expect(aboutButton).toBeInTheDocument();
    expect(aboutButton.closest("a")).toHaveAttribute("href", "/about");
  });
});
