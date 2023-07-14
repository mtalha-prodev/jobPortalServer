import express from "express";
import {
  getCompanyPost,
  jobPost,
  login,
  logout,
  register,
  updateJob,
  deleteJob,
  getCompany,
  updateCompany,
  deleteCompany,
  usersApply,
  getSingleApply,
  statusUpdateApply,
  uploadProfile,
} from "../../controllers/company/companyController.js";
import { isCompAuth } from "../../middleware/isAuth.js";
import { uploadFile } from "../../middleware/storage.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);

// GET Company details
router.route("/").get(isCompAuth, getCompany);
router
  .route("/:_id")
  .put(isCompAuth, updateCompany)
  .delete(isCompAuth, deleteCompany);

// upload profile pic
router.route("/profile").post(isCompAuth, uploadFile, uploadProfile);
// jobs posted
router.route("/job").post(isCompAuth, jobPost);
// get posted jobs
router.route("/jobs").get(isCompAuth, getCompanyPost);

// delete and update job
router
  .route("/job/:jobId")
  .put(isCompAuth, updateJob)
  .delete(isCompAuth, deleteJob);

// delete and update job
router.route("/jobs/:jobId/applications").get(isCompAuth, usersApply);
router
  .route("/jobs/:jobId/applications/:applicationId")
  .get(isCompAuth, getSingleApply);
// update applied applications status
router
  .route("/jobs/:jobId/applications/:applicationId/status")
  .post(isCompAuth, statusUpdateApply);

export default router;

// done
// HTTP Method: PUT
// Route: /api/company
// Action: Update the company's information.
// Request body: Updated company details.
// Get Company Profile:

// done
// HTTP Method: GET
// Route: /api/company
// Action: Retrieve the company's profile information.
// Delete Company Account:

// done
// HTTP Method: DELETE
// Route: /api/company
// Action: Delete the company's account and associated data.

// done
// Upload Profile Picture:
// Route: POST /company/profile
// Action: Upload and update the company profile picture in the database or storage.

// done
// Create a Job Post:
// HTTP Method: POST
// Route: /api/company/jobs
// Action: Create a new job post for the company.
// Request body: Job post details (title, description, requirements, location, etc.)
// Update a Job Post:

// done
// HTTP Method: PUT
// Route: /api/company/jobs/:jobId
// Action: Update an existing job post by its ID.
// Request body: Updated job post details.

// done
// Delete a Job Post:
// HTTP Method: DELETE
// Route: /api/company/jobs/:jobId
// Action: Delete a job post by its ID.

// done
// Get Company's Job Posts:
// HTTP Method: GET
// Route: /api/company/jobs
// Action: Retrieve all job posts associated with the company.

// done
// View Job Applications:
// HTTP Method: GET
// Route: /api/company/jobs/:jobId/applications
// Action: Retrieve all applications for a specific job post.
// Response: List of job applications.

// done
// View Single Job Application:
// HTTP Method: GET
// Route: /api/company/jobs/:jobId/applications/:applicationId
// Action: Retrieve details of a single job application.
// Response: Job application details.

// done
// Update Job Application Status:
// HTTP Method: PUT
// Route: /api/company/jobs/:jobId/applications/:applicationId/status
// Action: Update the status of a job application (e.g., shortlist, reject, hire).
// Request body: Updated application status.
// Update Company Information:
