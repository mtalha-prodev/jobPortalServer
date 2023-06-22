import express from "express";
import { adminLogin } from "../../controllers/admin/adminController.js";

const router = express.Router();

router.route("/login").post(adminLogin);

export default router;

// User Management:

// Route: /admin/users
// Action: Retrieve a list of all users or perform user management operations (e.g., view, edit, delete).
// Company Management:

// Route: /admin/companies
// Action: Retrieve a list of all companies or perform company management operations (e.g., view, edit, delete).
// Job Post Management:

// Route: /admin/jobs
// Action: Retrieve a list of all job posts or perform job post management operations (e.g., view, edit, delete).
// Review Management:

// Route: /admin/reviews
// Action: Retrieve a list of all job application reviews or perform review management operations (e.g., view, delete).
// User Details:

// Route: /admin/users/:userId
// Action: Retrieve detailed information about a specific user.
// Company Details:

// Route: /admin/companies/:companyId
// Action: Retrieve detailed information about a specific company.
// Job Post Details:

// Route: /admin/jobs/:jobId
// Action: Retrieve detailed information about a specific job post.
// Review Details:

// Route: /admin/reviews/:reviewId
// Action: Retrieve detailed information about a specific review.
// Edit User:

// Route: /admin/users/:userId/edit
// Action: Update the information of a specific user.
// Edit Company:

// Route: /admin/companies/:companyId/edit
// Action: Update the information of a specific company.
// Edit Job Post:

// Route: /admin/jobs/:jobId/edit
// Action: Update the information of a specific job post.
// Delete User:

// Route: /admin/users/:userId/delete
// Action: Delete a specific user.
// Delete Company:

// Route: /admin/companies/:companyId/delete
// Action: Delete a specific company.
// Delete Job Post:

// Route: /admin/jobs/:jobId/delete
// Action: Delete a specific job post.
// Delete Review:

// Route: /admin/reviews/:reviewId/delete
// Action: Delete a specific review.
// These are some examples of admin routes in a job portal application. Remember to implement corresponding route handlers in your Express.js application to handle these routes and perform the required administrative actions.
