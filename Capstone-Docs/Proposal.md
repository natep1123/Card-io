# Project Proposal: Deck of Cards Workout Generator

## Tech Stack

**Frontend:**

- Next.js (React): For building a responsive web application with server-side rendering and a dynamic user interface.
- Tailwind CSS: For styling the UI with a consistent, user-friendly design.

**Backend:**

- Node.js (minimal): For potential future API to store custom workouts (stretch goal).

**Data Storage:**

- sessionStorage: For persisting workout state (deck, exercises, stats) during sessions alongside React’s Context API.
- MondoDB: For storing “hardcoded” exercise sets (as well as user profiles and custom workouts - stretch goal).

**External API:**

- Deck of Cards API: For fetching a shuffled deck of 52 cards (saved to sessionStorage to minimize external API calls).

**Hosting:**

- Vercel: For deploying and scaling the Next.js web application.

## Focus of the Project

The project is primarily front-end focused, emphasizing an interactive UI for card-based workouts. The back-end is minimal, relying on the Deck of Cards API for deck retrieval, then saving the data to sessionStorage for state persistence. Future iterations may include a full-stack approach with profile creation, user authentication, and features to save custom workouts.

## Project Type

Website: A web application optimized for mobile.

## Project Goal

The goal is to deliver engaging, randomized bodyweight workout challenges using a 52-card deck, enabling users to exercise across four muscle groups (push, pull, legs, core) with scalable difficulty and track performance metrics (reps, time, skips). Unlike a regimented program, Card-io is a challenge with consistent exercises to allow users to improve fundamental movements (ex. pushups, pullups, squats) and track progress over time. The shuffled deck provides randomization and a multiplier provides scalability, while exercises remain the same each session unless users create custom workouts with future features.

## User Demographic

- Fitness Enthusiasts: Adults interested in bodyweight workouts, ranging from beginners to elite.
- Casual Exercisers: Individuals seeking fun, gamified fitness challenges with minimal equipment.
- Home Workout Users: People looking for accessible, no-gym exercise options.

## Data and API

1. Data:

- Deck data (52 cards, cards remaining, deck ID).
- Exercise data (name, group, reps/time, suit).
- Workout stats (reps, time, skipped cards).

2. Data Collection:

- Deck data fetched from Deck of Cards API.
- Exercise data hardcoded for consistency or gained via form input for custom; future custom exercises may be AI-generated with user prompt.
- Workout stats tracked and stored in sessionStorage.

3. API:

- Deck of Cards API provides an endpoint for deck shuffled deck retrieval.

## Project Approach

1. Exercise Data Structure:

   - Define structure of exercises data (numberExercises: [...exercises], royalExercises: [...exercises], aceExercises: [...exercises]).

2. Potential API Issues:

   - Rate Limits: Handle Deck of Cards API rate limits to ensure reliable deck fetching.
   - Data Sync: Ensure sessionStorage state aligns with API deck data to avoid inconsistencies.
   - Error Handling: Manage API errors (e.g., failed deck fetch) with user-friendly feedback.

3. Sensitive Information:

   - No personal data collected; app focuses on workout data and temporary session storage.

4. Functionality:

   - Workout Generation: Shuffle suits and assign to exercises, support deck sizes (full: 52, half: 26) and multipliers (1x, 2x, 3x) for difficulty scaling.
   - Card Drawing: Users draw cards to reveal exercises, with skip/tap-out options.
   - Stats Tracking: Display reps, completion time, and skipped cards in a summary.

5. User Flow:

   - Homepage: Start workout, select deck size/multiplier, or view About page.
   - Workout: Form (full/half deck, workout type, multiplier) --> Display (draw cards, perform exercises, skip card/tap out) --> Summary (view stats and/or reset workout state).
   - About: Information page.

6. Stretch Goals:
   - User authentication/account creation to save custom workouts.
   - AI integration (generate exercises based on user prompt?)
