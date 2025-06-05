# Frontend Planning

## Pages

1. **Home Page**

- User sees home page hook above two buttons: "workout" and "how does it work?"

2. **Workout Page** --> Form, Display, Summary

**Component Design:**

- Track workout state using Context API and save to sessionStorage for data persistence across pages
- Conditionally components based on workout state
- **On load, show form & preview tables** --> user sees form options for deck size, workout type and multiplier as well as a workout preview dropdown for exercises grouped by suit
- **On form submit, show display** --> user sees time elapsed, cards remaining count, card pile, current exercise, and two buttons: "skip card" and "tap out"
- **On workout end, show summary** --> user sees total time, total cards count, skipped cards count, a table for displaying the tracked workout stats and a reset button
- **On reset, return to form** --> user returned to form and data is reset

3. **About Page**

- User sees information about the app, giving an introductory overview, details about the mechanics, tips on scaling the workouts and individual exercises, and the total volume calculation.

## UI Components

1. **Header**

- Logo, title, slogan, nav links (hamburger menu for mobile)
- Applied to root layout

2. **Preview Dropdown**

- User sees exercises grouped by suit
- Each suit has 3 exercises: number, royal and ace
- Each suit is its own table showing exercise, group and type (e.g. pushups, push, number & pullups, pull, royal)
- Always show in order of push, pull, legs, core for user-friendly display

3. **Final Stats Table**

- Uses data from Context API live stats tracker (updates on every card draw/skip)
- Shows exercise, group, suit, total (e.g. pushups, push, hearts, 54 reps & squats, legs, spades, 54 reps)
