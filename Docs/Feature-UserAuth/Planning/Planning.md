# Route Planning for User Reg/Auth

## Pages

**API Endpoint = GET => “/login” => Login Page**

- This endpoint will show the login page containing a form with email and password input fields with a submit button and a quick link below to redirect to the registration page if the user does not have an account.

**API Endpoint = GET => “/register" => Registration Page**

- This endpoint will show the registration page containing a form with email and password input fields with a submit button and a quick link below to redirect to the login page if the user already has an account.

## Data Fetching

**API Endpoint = POST => “/register => Result**

- This endpoint creates a new user and saves the user to the database.
