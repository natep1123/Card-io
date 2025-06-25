import { render, screen } from "@testing-library/react";
import Home from "../app/page";

// Mock next-auth to avoid server-side logic
jest.mock("../auth", () => ({
  auth: jest.fn(() => Promise.resolve(null)),
}));

describe("Home Page", () => {
  it("renders the homepage with correct content", async () => {
    // Await the async Home component to get the JSX element
    const homeElement = await Home();

    // Render the resolved JSX
    render(homeElement);

    expect(screen.getByText("Welcome to Card-io!")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Ready to take a gamble on an intense workout challenge?/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Card-io uses the Deck of Cards API to randomize full-body workout challenges./i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Simple to play, but hard to master./i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Think you can handle it?/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Place your bets and click below to get your challenge!/i
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Workout")).toBeInTheDocument();
    expect(screen.getByText("How Does It Work?")).toBeInTheDocument();
    expect(screen.getByText("Want to save your stats?")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });
});
