# Route Planning for User Reg/Auth

## Pages

**API Endpoint = GET => “/login” => Login Page**

- This endpoint will show the login page containing a form with email and password input fields with a submit button and a quick link below to redirect to the registration page if the user does not have an account.
- Protected from logged-in users.

**API Endpoint = GET => “/register" => Registration Page**

- This endpoint will show the registration page containing a form with email and password input fields with a submit button and a quick link below to redirect to the login page if the user already has an account.
- Protected from logged-in users.

**API Endpoint = GET => “/profile" => Profile Page**

- This endpoint will show the profile page containing user information and an analytical line chart for progress over time with dropdowns to change deck-size and multiplier (to only compare like workouts).
- May also contain buttons for profile actions (e.g. CRUD --> info updates, profile deletion, workout deletion, etc).
- Protected from non-logged-in users.

## Data Fetching

**API Endpoint = POST => “/register => Result**

- This endpoint creates a new user and saves the user to the database.

_Login and logout will be handled by NextAuth library, no endpoint needed._
