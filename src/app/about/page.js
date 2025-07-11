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
            ensuring no two Card-io workouts are ever alike.
          </p>
          <p>
            The goal of Card-io is to complete the entire deck of cards in a
            single workout. This is a high-volume challenge, so be sure to scale
            the workout to your personal fitness level. If the exercise drawn is
            too difficult, listen to your body and find an alternative if
            necessary.{" "}
            <b>
              The goal is to challenge yourself, move your body, and improve
              over time, not to complete the entire deck at all costs.
            </b>
          </p>
          <p>
            Some quick ways to make an exercise easier include: reducing the
            number of reps entirely, breaking the reps into smaller sets,
            finding an easier alternative exercise, or any combination thereof.
            For example, if you draw a card that requires 10 pushups, you could
            instead do 1 set of your limit, 2 sets of 5, switch to knee pushups,
            etc. If you draw a card that requires 30 seconds of planks, you
            could do one set of your limit, 2 sets of 15 seconds, switch to a
            wall plank, etc. <b>Get creative and find what works for you!</b>
          </p>
          <p>
            The Card-io workout is designed to be scalable to your fitness
            level, so you can adjust it as needed by deck size and a multiplier.
            Anytime, you can skip a card or tap out to end the workout early and
            view your results. Shuffling the deck before each workout ensures
            that you will never do the same workout twice. However, be aware
            that the deck is shuffled before being cut, so the results for
            half-deck workouts are entirely random.
          </p>
        </div>

        <div className="flex flex-col gap-4 rounded-lg bg-gray-800 p-4">
          <h3 className="font-semibold text-lg">How It Works</h3>
          <p>
            The original challenge consists of exercises from each of the 4
            primary muscle groups (push, pull, legs, and core), plus timed
            challenges. The original exercises are always the same, allowing you
            to compare your performance over time.{" "}
            <b>
              You can modify the challenge to your desired difficulty by
              selecting the deck size (full or half) and a multiplier (x1, x2,
              or x3) to increase the total volume.
            </b>
          </p>
          <p>
            Values for exercises are determined by card groupings. The base
            values are as follows:{" "}
            <b>
              number cards are worth their number in reps, royal cards are worth
              5 reps, and aces are worth 30 seconds.
            </b>{" "}
            For example, if hearts are assigned to push exercises, then the 2 of
            hearts would be 2 push-ups, the 3 of hearts would be 3 push-ups, and
            so on up to the 10 of hearts which would be 10 push-ups. The Jack,
            Queen, and King of hearts would each be worth 5 dips, and the Ace of
            hearts would be worth 30 seconds of planks. The same applies to the
            other suits for pull, legs, and core exercises.
          </p>
        </div>
        <div className="flex flex-col gap-4 rounded-lg bg-gray-800 p-4">
          <h3 className="font-semibold text-lg">How much Volume?</h3>
          <p>
            To calculate the volume (total reps and/or time) of a Card-io
            workout using a x1 multiplier, we can first determine the reps for
            each exercise by card grouping (number, royal, ace). If you complete
            all the reps for a number exercise, you will complete 9 sets of 2-10
            reps (2+3+4+5+...+10) totaling 54 reps. Royal exercises consist of 3
            sets of 5 reps, totaling 15. Aces are 1 set each of 30 seconds. The
            total volume for a workout is the sum of reps/time from all the
            completed exercises.
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
        <div className="flex flex-col gap-4 rounded-lg bg-gray-800 p-4">
          <h3 className="font-semibold text-lg">Analytics and Stats Saving</h3>
          <p>
            After completing a workout, view your summary with a bar chart
            displaying percent completion per muscle group and a table exercises
            with the reps completed for each.
          </p>
          <p>
            You can choose to save your workout stats in the summary, which
            saves them to your account and enables viewing the analytical line
            chart in your profile to track progress over time based on overall
            workout completion. Only like-workouts are compared, so if you
            complete a half-deck original workout with a x1 multiplier, it will
            only be compared to other half-deck original workouts with a x1
            multiplier.
          </p>
          <span className="text-sm italic text-gray-400">
            Available to logged-in users only.
          </span>
        </div>
        <div className="flex flex-col gap-4 rounded-lg bg-gray-800 p-4">
          <h3 className="font-semibold text-lg">
            AI Insights and Custom Workouts
          </h3>
          <p>
            With at least one saved workout, you can get insights generated by
            ChatGPT&apos;s gpt-4.1. It will retrieve your most recent saved
            workout stats (up to 5) and generate insights into the trends of
            your data.
          </p>
          <p>
            Along with insights, it will create two custom workouts designed to
            help you improve your performance in the Card-io challenge and
            strengthen underperforming muscle groups. The workouts are designed
            to be practical and safe, focusing on simple exercises that can be
            done with minimal equipment or at a standard gym with basic
            equipment. The AI will also provide a brief warmup and cooldown
            routine, along with motivational tips. You can click-to-copy the
            generated workouts to your clipboard to easily past into your
            favorite notes app or workout tracker.
          </p>
          <p>
            Limited to 2 calls per day. Bad responses from AI do not count
            against your limit.
          </p>
          <span className="text-sm italic text-gray-400">
            Available to logged-in users only.
          </span>
        </div>
      </div>
    </div>
  );
}
