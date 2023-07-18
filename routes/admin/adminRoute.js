import express from "express";
import {
  deleteJob,
  getAllJobs,
  login,
  logout,
  register,
  singleJob,
} from "../../controllers/admin/adminController.js";
import { isAdminAuth } from "../../middleware/isAuth.js";
import {
  getAllUsers,
  userDelete,
  userUpdate,
} from "../../controllers/admin/adminUserControl.js";

import {
  getAllCompanies,
  companyUserDelete,
  companyUserUpdate,
} from "../../controllers/admin/adminCompanyControl.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);

// admin view user api url
// http://127.0.0.1:8080/api/v1/admin/users
router.route("/users").get(isAdminAuth, getAllUsers);

// admin delete & update user url
// http://127.0.0.1:8080/api/v1/admin/user/649a130ff59a0687c534ca96

router
  .route("/user/:_id")
  .delete(isAdminAuth, userDelete)
  .put(isAdminAuth, userUpdate);

// admin view companies api url get all companies user
// http://127.0.0.1:8080/api/v1/admin/companies
router.route("/companies").get(isAdminAuth, getAllCompanies);

// admin delete & update company url
// http://127.0.0.1:8080/api/v1/admin/company/649b2baec9459c740b03fb5c

router
  .route("/company/:_id")
  .delete(isAdminAuth, companyUserDelete)
  .put(isAdminAuth, companyUserUpdate);

// http://127.0.0.1:8080/api/v1/admin/jobs
router.route("/jobs").get(isAdminAuth, getAllJobs);
// http://127.0.0.1:8080/api/v1/admin/jobs/:jobId
router.route("/jobs/:jobId").get(isAdminAuth, singleJob);
// http://127.0.0.1:8080/api/v1/admin/jobs/:jobId/delete
router.route("/jobs/:jobId/delete").delete(isAdminAuth, deleteJob);

export default router;

// done
// User Management:
// Route: /admin/users
// Action: Retrieve a list of all users or perform user management operations (e.g., view, edit, delete).

// done
// Company Management:
// Route: /admin/companies
// Action: Retrieve a list of all companies or perform company management operations (e.g., view, edit, delete).

// done
// Edit User:
// Route: /admin/users/:userId/edit
// Action: Update the information of a specific user.

// done
// Edit Company:
// Route: /admin/companies/:companyId/edit
// Action: Update the information of a specific company.

// done
// Edit Job Post:
// Route: /admin/jobs/:jobId/edit
// Action: Update the information of a specific job post.

// done
// Delete User:
// Route: /admin/users/:userId/delete
// Action: Delete a specific user.

// done
// User Details:
// Route: /admin/users/:userId
// Action: Retrieve detailed information about a specific user.

// done
// Company Details:
// Route: /admin/companies/:companyId
// Action: Retrieve detailed information about a specific company.

// done
// Delete Company:
// Route: /admin/companies/:companyId/delete
// Action: Delete a specific company.

// done
// Job Post Details:
// Job Post Management:
// Route: /admin/jobs
// Action: Retrieve a list of all job posts or perform job post management operations (e.g., view, edit, delete).

// done
// Route: /admin/jobs/:jobId
// Action: Retrieve detailed information about a specific job post.
// Review Details:

// done
// Delete Job Post:
// Route: /admin/jobs/:jobId/delete
// Action: Delete a specific job post.

// Route: /admin/reviews/:reviewId
// Action: Retrieve detailed information about a specific review.

// Review Management:
// Route: /admin/reviews
// Action: Retrieve a list of all job application reviews or perform review management operations (e.g., view, delete).

// Delete Review:
// Route: /admin/reviews/:reviewId/delete
// Action: Delete a specific review.
// These are some examples of admin routes in a job portal application. Remember to implement corresponding route handlers in your Express.js application to handle these routes and perform the required administrative actions.
