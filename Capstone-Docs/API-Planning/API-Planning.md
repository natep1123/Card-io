# API Route Specifications

## **Pages:**

**API Endpoint = GET => “/login” => Login Page**

- This endpoint will show the home page containing an introduction to the app and two buttons to navigate to the workout and about pages.

**API Endpoint = GET => “/workout” => Workout Page**

- This endpoint shows a form component on load for choosing deck size, workout type and multiplier.
- Submission of the form renders the workout display component.
- Ending the workout renders the workout summary component.
- Resetting the summary returns user to the form.

**API Endpoint = GET => “/about” => About Page**

- This endpoint shows the about page, detailing information about how the app works.

## **Data Fetching:**

**API Endpoint = GET => “/deck/new => Result**

- This endpoint retrieves a new shuffled deck from the Deck of Cards API.

**API Endpoint = GET => “/workout/original” => Result**

- This endpoint retrieves the "Original" workout exercises.
