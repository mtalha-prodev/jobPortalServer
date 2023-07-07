import express from "express";
import {
  login,
  register,
  logout,
  getUser,
  updateUser,
  deleteUser,
  changePassword,
  searchJobs,
  applyJobs,
  saveJobs,
  getSaveJobs,
  getApplyJobs,
} from "../../controllers/jobSekeer/userController.js";
import { isUserAuth } from "../../middleware/isAuth.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);

router.route("/").get(getUser);
router
  .route("/:_id")
  .put(isUserAuth, updateUser)
  .delete(isUserAuth, deleteUser);

// change password
router.route("/change_password/:_id").get(isUserAuth, changePassword);
// search jobs
router.route("/jobs/search/:key").get(isUserAuth, searchJobs);
// apply jobs
router.route("/job/:jobId/apply").post(isUserAuth, applyJobs);
// save jobs post
router.route("/job/:jobId/save").post(isUserAuth, saveJobs);
// save jobs get
router.route("/save_jobs").get(isUserAuth, getSaveJobs);
// applied jobs get
router.route("/applied-jobs").get(isUserAuth, getApplyJobs);

export default router;

// done
// User Registration:
// Route: POST /users/register
// Action: Create a new user account in the database.
// User Login:

// done
// Route: POST /users/login
// Action: Authenticate user credentials and generate a session or JSON Web Token (JWT) for subsequent requests.

// done
// User Profile:
// Route: GET /users/profile
// Action: Fetch and display the user's profile information.

// done
// Edit User Profile:
// Route: PUT /users/profile
// Action: Update the user's profile information in the database.

// done
// Change Password:
// Route: PUT /users/password
// Action: Change the user's password in the database.

// Upload Profile Picture:
// Route: POST /users/profile/picture
// Action: Upload and update the user's profile picture in the database or storage.

// done
// Search Jobs:
// Route: GET /jobs/search
// Action: Retrieve job listings based on search criteria, such as keywords, location, or job category.

// done
// Apply to Job:
// Route: POST /jobs/:jobId/apply
// Action: Submit a job application for a specific job listing.

// done
// Save Job:
// Route: POST /jobs/:jobId/save
// Action: Save a job listing for future reference or application.

//
// View Applied Jobs:
// Route: GET /users/applied-jobs
// Action: Retrieve a list of jobs to which the user has applied.

//
// View Saved Jobs:
// Route: GET /users/saved-jobs
// Action: Retrieve a list of jobs that the user has saved.
