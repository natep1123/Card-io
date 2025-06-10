# Analytical Charts Proposal

## Summary

Two analytical charts could be added to Card-io:

1.  Add a bar chart to the workout summary showing percent completion of each muscle group for that individual workout, excluding timed challenges. For example, lets use the full-deck workout with a x1 multiplier. That instance of the workout provides 54 total reps per number exercise and 15 reps per royal exercise giving 69 total reps per muscle group. If a user completed 50, 69, 48, and 32 for push, pull, legs and core respectively, then the chart would show 72.5%, 100%, 69.6% and 46.4% respectively, and 72.1% overall completion. Logged-in users would have the option to save the stats to their profile to track progress over time.

2.  Add a line chart for displaying progress over time based on total completion per workout (72.1% from the above example), accessible to logged-in users. The dashboard would have options for comparing workouts over time by their deck size and multiplier, ensuring only like workouts are compared. Y-axis would be percentage (0-100) and x-axis would be the dates of completed workouts. Hovering over a data point would display the bar chart from that workout.

## Feature Goal

The goal of the analytical charts feature would be to provide insight into the user's progress over time for the challenge.

## Dependencies

Chart.js, a lightweight library for creating responsive charts in JavaScript, would be the only library needed for this feature specifically.

## Approach

1. Define Data Structure:

   - Define schema for workout stats (to be used for charts).

2. Fetch and Process Data:

   - Use Context API to retrieve workout data.
   - Calculate percentage completion for each muscle group.

3. Bar Chart Implementation:

   - Create a Chart.js bar chart in the workout summary component.
   - Set four bars (push, pull, legs, core) with percentage completion (0-100%).
   - Use distinct colors for each muscle group (e.g., blue, red, green, purple).
   - Display overall completion as a label or tooltip.

4. Line Chart Implementation:

   - Create a Chart.js line chart in the user dashboard.
   - Plot total completion percentages (y-axis, 0-100%) against workout dates (x-axis).
   - Filter data by deck size and multiplier for comparable workouts.
   - Add hover interaction to trigger the bar chart from the selected workout’s data.

5. Integrate with Context API:

   - Pull data from Context for bar charts, from user' profile in MongoDB for line charts.

6. UI:

   - Add responsive design for mobile and desktop.
   - Provide dropdowns for filtering line chart by deck size/multiplier.

7. Testing

## 3 Q's

1. What data am I collecting from the user?

- Reps completed per muscle group per workout
- Total reps completed per workout

2. What data am I showing to the user?

- Percentage of completion per muscle group per workout
- Total percentage of completion per workout

3. In what form am I showing the data?

- Bar chart for post-workout summary. Y-axis: percent (0-100), X-axis:
- Line chart for displaying multiple workouts, tracking progress over time
