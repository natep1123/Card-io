import ExercisesExample from "@/components/about/ExercisesExample";

export default function AboutPage() {
  const paragraphs = [
    {
      q: "Intro",
      a: [
        <p>
          A standard deck of 52 cards has 4 suits: hearts, clubs, diamonds, and
          spades, each with 13 cards. Every suit includes 9 number cards (2-10),
          3 royal cards (Jack, Queen, King), and an ace. Shuffling a deck
          creates 52 factorial (52!) possibilities, which translates to over 8
          quintillion (8,000,000,000,000,000,000,000) unique sequences, ensuring
          no two Card-io workouts are ever alike.
        </p>,
        <p>
          The goal of Card-io is to complete the entire deck of cards in a
          single workout. This is a high-volume challenge, so be sure to scale
          the workout to your personal fitness level. You can choose between a
          full deck (52 cards) or a half deck (26 cards). If the exercise drawn
          is too difficult (like 10 Archer Pullups per side), feel free to break
          it into smaller sets (like 5 sets of 2 per side).
        </p>,
        <p>
          Card-io is still in development with plans to make it more
          customizable so that it can be better tailored to the individual
          user's fitness level. For now, the exercises are randomized from a
          pool of exercises for each muscle group plus timed challenges. The
          exercises are all bodyweight-based and can be done with little-to-no
          equipment.
        </p>,
      ],
    },
    {
      q: "How It Works",
      a: [
        <>
          <p>
            Every workout consists of exercises from the 4 primary muscle
            groups: push, pull, legs, and core, plus timed challenges. Each
            muscle group is assigned a suit and two random exercises from each
            group are chosen at random. Each suit is also assigned a random
            timed challenge for its ace card. Number cards are worth their
            number in reps, royal cards are worth 10 and aces are worth 30/45/60
            seconds (chosen randomly).
          </p>
          <ExercisesExample />
        </>,
      ],
    },
    {
      q: "How Much Volume?",
      a: [
        <p>
          To calculate the volume (total reps and/or time) of a Card-io workout,
          we can first determine the reps for each exercise type (number, royal,
          ace). If you complete all the reps for a number exercise, you will
          complete 9 sets of 2-10 reps (2+3+4+5...10) totaling 54 reps. Royal
          exercises consist of 3 sets of 10 reps, totaling 30. Aces are 1 set
          each of 30/45/60 seconds (chosen randomly). The total volume for a
          workout is the sum of reps/time from all the completed exercises.
        </p>,
        <>
          <div className="my-4">
            <span>
              Assuming you complete all 52 cards in the deck, you will have
              completed:
            </span>{" "}
            <ul className="list-disc pl-5">
              <li>
                (54x4) + (30x4) ={" "}
                <span className="font-bold">336 total reps</span> from 8
                exercises across 48 sets.
              </li>
              <li>
                (30/45/60)x4 ={" "}
                <span className="font-bold">120-240 total seconds</span> from 4
                timed challenges.
              </li>
            </ul>
          </div>
          <span className="text-gray-400 text-sm">
            NOTE: Half-decks will result in entirely random volume outputs due
            to the deck being shuffled before being cut.
          </span>
        </>,
      ],
    },
  ];

  return (
    <div className="flex flex-col w-full items-center max-w-2xl">
      <h2>How Does It Work?</h2>
      <div className="text-left flex flex-col gap-4">
        {paragraphs.map((para, index) => (
          <div key={index} className="border-b border-gray-700 pb-4">
            <h3 className="text-lg font-semibold mb-2">{para.q}</h3>
            <div className="text-white">
              {para.a.map((p) => {
                return (
                  <div key={`${index}-${Math.random()}`} className="mb-2">
                    {p}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
