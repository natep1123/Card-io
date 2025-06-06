# Defining Schemas

## Individual Exercises

**exerciseSchema:**

- name: {type: String, required: true},
- unit: {type: String, required: true, enum: ["reps", "seconds"]},
- group: {type: String, required: true, enum: ["push", "pull", "legs", "core", "timed"]},
- No id for subdocuments

## Workouts (Set of Exercises)

**workoutSchema:**

- type: {type: String, required: true},
- exercises: {numberExercises: [exerciseSchema], royalExercises: [exerciseSchema], aceExercises: [exerciseSchema]},
- id

## Summary

The original workout/challenge (not custom by the user) will have one push, pull, legs and core exercise each for both number and royal cards. Each exercise contains a name, unit (e.g. reps, reps per side, seconds) and group (push, pull, legs, or core). Workouts organize them by their card-group (number, royal, ace). Suits will be assigned to each exercise in middleware so suits can be randomized.

**"Original" Example:**

**original:**:

- type: "original",
- exercises:
  - numberExercises: [{ name: "Pushups", unit: "reps", group: "push" }, { name: "Horizontal Rows", unit: "reps", group: "pull" }, { name: "Squats", unit: "reps", group: "legs" }, { name: "Mountain Climbers", unit: "reps", group: "core" }],
  - royalExercises: [ { name: "Dips", unit: "reps", group: "push" }, { name: "Pullups", unit: "reps", group: "pull" }, { name: "Lunges", unit: "reps", group: "legs" }, { name: "Hanging Leg Raises", unit: "reps", group: "core" }],
  - aceExercises: [ { name: "Plank", unit: "seconds", group: "timed" }, { name: "Plank", unit: "seconds", group: "timed" }, { name: "Side Plank", unit: "seconds", group: "timed" }, { name: "Side Plank", unit: "seconds", group: "timed" }]
