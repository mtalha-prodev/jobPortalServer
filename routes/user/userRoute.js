import express from "express";
import { userRegister } from "../../controllers/jobSekeer/userController.js";

const router = express.Router();

router.route("/register").post(userRegister);

export default router;

// User Registration:

// Route: POST /users/register
// Action: Create a new user account in the database.
// User Login:

// Route: POST /users/login
// Action: Authenticate user credentials and generate a session or JSON Web Token (JWT) for subsequent requests.
// User Profile:

// Route: GET /users/profile
// Action: Fetch and display the user's profile information.
// Edit User Profile:

// Route: PUT /users/profile
// Action: Update the user's profile information in the database.
// Change Password:

// Route: PUT /users/password
// Action: Change the user's password in the database.
// Upload Profile Picture:

// Route: POST /users/profile/picture
// Action: Upload and update the user's profile picture in the database or storage.
// Search Jobs:

// Route: GET /jobs/search
// Action: Retrieve job listings based on search criteria, such as keywords, location, or job category.
// Apply to Job:

// Route: POST /jobs/:jobId/apply
// Action: Submit a job application for a specific job listing.
// Save Job:

// Route: POST /jobs/:jobId/save
// Action: Save a job listing for future reference or application.
// View Applied Jobs:

// Route: GET /users/applied-jobs
// Action: Retrieve a list of jobs to which the user has applied.
// View Saved Jobs:

// Route: GET /users/saved-jobs
// Action: Retrieve a list of jobs that the user has saved.
