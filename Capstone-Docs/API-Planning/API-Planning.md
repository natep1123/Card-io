# API Route Specifications

**Pages:**
1. API Endpoint = GET => “/login” => Login Page
- This endpoint will show the home page containing an introduction to the app and two buttons to navigate to the workout and about pages.

2. API Endpoint = GET => “/workout” => Workout Page
- This endpoint shows a form component on load for choosing deck size, workout type and multiplier.
- Submission of the form renders the workout display component.
- Ending the workout renders the workout summary component.
- Resetting the summary returns user to the form.

3. API Endpoint = GET => “/about” => About Page
- This endpoint shows the about page, detailing information about how the app works.

**Data Fetching:**

4. API Endpoint = GET => “/deck/new => Result
- This endpoint retrieves a new shuffled deck from the Deck of Cards API.

5. API Endpoint = GET => “/workout/original” => Result
- This endpoint retrieves the "Original" workout exercises.
