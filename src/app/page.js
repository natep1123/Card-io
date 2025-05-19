import Link from "next/link";

export default function Home() {
  const intro = [
    "Ready to take a gamble on an intense workout challenge?",
    "Card-io uses the Deck of Cards API to randomize full-body workout challenges.",
    "Simple to play, but hard to master.",
    "Think you can handle it?",
    "Place your bets and click below to get started!",
  ];

  return (
    <div className="flex flex-col gap-4 items-center">
      <h2>Welcome to Card-io!</h2>

      {/* Introduction */}
      <div className="flex flex-col gap-2">
        {intro.map((text, index) => (
          <p key={index} className="text-center italic text-gray">
            {text}
          </p>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4">
        <Link
          href="/workout"
          className="bg-red font-semibold rounded-md px-6 py-3 text-center hover:bg-red-600 transition"
        >
          Workout
        </Link>
        <Link
          href="/about"
          className="bg-green font-semibold rounded-md px-6 py-3 text-center hover:bg-green-600 transition"
        >
          How Does It Work?
        </Link>
      </div>
    </div>
  );
}
