# User Registration/Authentication Proposal

## Summary

Users should be able to register an account using email/password to gain access to saving workout stats for the progress-over-time line chart.

## Feature Goal

The goal of this feature is to allow users to create an account, log in/out, and restrict access to profile-related pages to only logged-in users.

## Dependencies

- NextAuth for authentication
- Bcryptjs for password hashing

## Approach

1. Define Data Structure:

   - Define schema for user profiles (id, username, hashed password, [...workoutStats]).

2. Fetch and Process Data:

   - Get username/password from user in registration form
   - Hash password and save to MongoDB

3. Implementation:

   - Set up auth.js and SessionProvider
   - Create auth checks and redirects for Profile pages

4. UI:

   - Add login/registration pages and corresponding forms
   - Add Profile and Login/Logout links to navbar

5. Testing
