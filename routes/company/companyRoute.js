import express from "express";
import { login, register } from "../../controllers/company/companyController.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);

export default router;

// Create a Job Post:

// HTTP Method: POST
// Route: /api/company/jobs
// Action: Create a new job post for the company.
// Request body: Job post details (title, description, requirements, location, etc.)
// Update a Job Post:

// HTTP Method: PUT
// Route: /api/company/jobs/:jobId
// Action: Update an existing job post by its ID.
// Request body: Updated job post details.
// Delete a Job Post:

// HTTP Method: DELETE
// Route: /api/company/jobs/:jobId
// Action: Delete a job post by its ID.
// Get Company's Job Posts:

// HTTP Method: GET
// Route: /api/company/jobs
// Action: Retrieve all job posts associated with the company.
// View Job Applications:

// HTTP Method: GET
// Route: /api/company/jobs/:jobId/applications
// Action: Retrieve all applications for a specific job post.
// Response: List of job applications.
// View Single Job Application:

// HTTP Method: GET
// Route: /api/company/jobs/:jobId/applications/:applicationId
// Action: Retrieve details of a single job application.
// Response: Job application details.
// Update Job Application Status:

// HTTP Method: PUT
// Route: /api/company/jobs/:jobId/applications/:applicationId/status
// Action: Update the status of a job application (e.g., shortlist, reject, hire).
// Request body: Updated application status.
// Update Company Information:

// HTTP Method: PUT
// Route: /api/company
// Action: Update the company's information.
// Request body: Updated company details.
// Get Company Profile:

// HTTP Method: GET
// Route: /api/company
// Action: Retrieve the company's profile information.
// Delete Company Account:

// HTTP Method: DELETE
// Route: /api/company
// Action: Delete the company's account and associated data.
