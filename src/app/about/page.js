export default function AboutPage() {
  return (
    <div className="flex flex-col gap-4 w-full items-center max-w-2xl">
      <h2>How Does It Work?</h2>
      <div className="text-left flex flex-col gap-4">
        <div className="flex flex-col gap-4 rounded-lg bg-gray-800 p-4">
          <h3 className="font-semibold text-lg">Intro</h3>
          <p>
            A standard deck of 52 cards has 4 suits: hearts, clubs, diamonds,
            and spades, each with 13 cards. Every suit includes 9 number cards
            (2-10), 3 royal cards (Jack, Queen, King), and an ace. Shuffling a
            deck creates 52 factorial (52!) possibilities, which translates to
            over 8 quintillion (8,000,000,000,000,000,000,000) unique sequences,
            ensuring no two Card-io workouts are ever alike.{" "}
          </p>
          <p>
            The goal of Card-io is to complete the entire deck of cards in a
            single workout. This is a high-volume challenge, so be sure to scale
            the workout to your personal fitness level. You can choose between a
            full deck (52 cards) or a half deck (26 cards) and a multiplier (x1,
            x2, x3). If the exercise drawn is too difficult, listen to your body
            and find an alternative if necessary.{" "}
            <b>
              The goal is to challenge yourself, move your body, and improve
              over time, not to complete the entire deck at all costs.
            </b>
          </p>
          <p>
            Some quick ways to make an exercise easier include: reducing the
            number of reps entirely, breaking the reps into smaller sets,
            finding an easier alternative exercise, or any combination thereof.
            For example, if you draw a card that requires 10 push-ups, you could
            instead do 1 set of your limit, 2 sets of 5, switch to knee
            push-ups, etc. If you draw a card that requires 30 seconds of
            planks, you could do one set of your limit, 2 sets of 15 seconds,
            switch to a wall plank, etc.{" "}
            <b>Get creative and find what works for you!</b>
          </p>
          <p>
            Card-io is a fun and challenging way to get a full-body workout. It
            is recommended to begin with the x1 multiplier if you are new to it,
            and a half deck if you want to test it out with lower volume.
            Anytime, you can "tap out" to end the workout early and view your
            results. If you are looking for increased intensity, you can
            increase the multiplier to x2 or x3. The Card-io workout is designed
            to be scalable to your fitness level, so you can adjust it as
            needed. Shuffling the deck before each workout ensures that you will
            never do the same workout twice. However, be aware that the deck is
            shuffled before being cut, so the results for half-deck workouts are
            entirely random.
          </p>
          <p>
            Values for exercises are determined by card groupings. The base
            values are as follows: number cards are worth their number in reps,
            royal cards are worth 5 reps, and aces are worth 30 seconds. For
            example, if hearts are assigned to push exercises, then the 2 of
            hearts would be 2 push-ups, the 3 of hearts would be 3 push-ups, and
            so on up to the 10 of hearts which would be 10 push-ups. The Jack,
            Queen, and King of hearts would each be worth 5 dips, and the Ace of
            hearts would be worth 30 seconds of planks. The same applies to the
            other suits for pull, legs, and core exercises.
          </p>
          <p>
            To calculate the volume (total reps and/or time) of a Card-io
            workout, we can first determine the reps for each exercise type
            (number, royal, ace). If you complete all the reps for a number
            exercise, you will complete 9 sets of 2-10 reps (2+3+4+5+...+10)
            totaling 54 reps. Royal exercises consist of 3 sets of 5 reps,
            totaling 15. Aces are 1 set each of 30 seconds. The total volume for
            a workout is the sum of reps/time from all the completed exercises.
          </p>
          <div>
            Assuming you complete all 52 cards in the deck with a x1 multiplier,
            you will have completed:
            <ul className="list-disc pl-5">
              <li>
                (54 × 4) + (15 × 4) = 336 total reps from 8 exercises across 48
                sets.
              </li>
              <li>(30 × 4) = 120 total seconds from 4 timed challenges.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
