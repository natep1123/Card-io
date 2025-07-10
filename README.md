# Card-io

_Card-io is a workout generator using the Deck of Cards API for randomized full-body workout challenges featuring stat tracking/saving, analytics and AI-generated insights/workouts based on recently-saved stats!_

## Features

- **Unique Workouts**: Shuffled deck ensures no two sessions are the same (52! possibilities).
- **Muscle Groups**: 4 suits map to push, pull, legs, core exercises plus timed challenges.
- **Reps and Values (with x1 mult.)**:
  - Number cards (2-10): Reps equal to number.
  - Royal cards (J, Q, K): 5 reps each.
  - Aces: 30 seconds timed.
- **Scalability**: Choose full/half deck and multipliers (x1, x2, x3).
- **Customization**: Skip cards, end early, adjust exercises for fitness level.
- **Analytics**: Post-workout summary with bar chart for muscle group completion percentages and exercises table.
- **Stats Saving**: Save workout stats to account for line chart tracking progress over time (compares like-workouts only).
- **AI Insights**: Generate insights and 2 custom workouts via ChatGPT (gpt-4.1) based on recently-saved stats (up to 5). Includes inisghts, warmups, cooldowns, tips and 2 custom workouts. 2 calls/day limit.

## Tech Stack

- **Frontend:** Next.js, React.js
- **Backend:** MongoDB, Mongoose
- **Authentication:** NextAuth
- **API Requests:** Axios
- **APIs:** Deck of Cards API, OpenAI Platform
- **Analytical Charts:** Chart.js
- **Deployment:** Vercel
