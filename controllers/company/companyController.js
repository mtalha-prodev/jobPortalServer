import { Company, JobPost } from "../../model/company/companySchema.js";
import bcrypt from "bcryptjs";
import { sendToken } from "../../sendToken/sendToken.js";
import Users from "../../model/jobSekeer/userSchema.js";

export const register = async (req, res) => {
  try {
    const { email, name, contactNumber } = req.body;

    // bcrypt password hashing  algorithm
    const salt = await bcrypt.genSalt(10);

    const password = await bcrypt.hash(req.body.password, salt);

    let user = await Company.findOne({ email });

    if (user) {
      return res
        .status(404)
        .json({ status: false, message: "User already exists" });
    }
    // first step
    if (!email || !name || !password || !contactNumber) {
      return res
        .status(404)
        .json({ status: false, message: "All fields are required" });
    }

    const data = {
      name,
      email,
      contactNumber,
      password,
    };

    user = await Company.create(data);

    // console.log("first")
    sendToken(res, user, 200, "user register successful!");
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await Company.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    const isMatch = await user.isMatchPassword(password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ status: false, message: "wrong email/password" });
    }

    sendToken(res, user, 200, "user login successful");
  } catch (error) {
    res.status(401).json({ status: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()) })
      .json({ status: true, message: "user logout!" });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

// upload profile pic
export const uploadProfile = async (req, res) => {
  try {
    const profile = req.file;

    // const _id = req.user._id;

    res
      .status(404)
      .json({ status: false, message: "User profile pic upload", profile });
  } catch (error) {
    res.status(404).json({ status: false, message: error.message });
  }
};

// get company details
export const getCompany = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ status: false, message: "user not found!" });
    }

    const _id = req.user._id;

    // console.log(req.user.email);
    const user = await Company.findById({ _id });

    // console.log(user);
    res
      .status(404)
      .json({ status: false, user, message: "get user successfuly!" });
  } catch (error) {
    res.status(404).json({ status: false, message: error.message });
  }
};

// update company details
export const updateCompany = async (req, res) => {
  try {
    const _id = req.user._id;

    if (!_id) {
      return res.status(400).json({ status: true, message: " user not found" });
    }

    let user = await Company.findById({ _id: req.params._id });

    if (!user) {
      return res.status(404).json({ status: true, message: " user not found" });
    }

    user = await Company.findByIdAndUpdate({ _id: req.params._id }, req.body, {
      new: true,
    });

    res
      .status(200)
      .json({ status: true, user, message: "Company updated successfully" });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};
// company account delete
export const deleteCompany = async (req, res) => {
  try {
    const _id = req.user._id;

    if (!_id) {
      return res.status(400).json({ status: true, message: "user not found" });
    }

    let del = await Company.findById({ _id: req.params._id });
    // console.log(del);
    if (!del) {
      return res
        .status(404)
        .json({ status: true, message: "Company not found!" });
    }

    del = await Company.findByIdAndDelete({ _id: req.params._id });

    res
      .status(200)
      .json({ status: true, message: "Company deleted successfully", del });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

// company job posting functionality

// company job posted relationship in schema
export const jobPost = async (req, res) => {
  try {
    const _id = req.user._id;

    if (!_id) {
      return res.status(400).json({ status: false, message: "Invalid user" });
    }

    const post = {
      company: _id,
      title: req.body.title,
      requirements: req.body.requirements,
      employmentType: req.body.jobType,
      location: req.body.location,
      skills: req.body.skills,
    };

    const job = await JobPost.create(post);

    res.status(201).json({
      status: true,
      jobPost: job,
      message: "Success job posted",
    });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

// get company all job posts
export const getCompanyPost = async (req, res) => {
  try {
    const _id = req.user._id;

    if (!_id) {
      return res.status(400).json({ status: false, message: "User not found" });
    }

    const jobs = await JobPost.find({ company: _id });

    return res
      .status(200)
      .json({ status: true, message: "get company job post", jobs });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

// update job with filter
export const updateJob = async (req, res) => {
  try {
    const _id = req.user._id;
    const jobId = req.params.jobId;

    if (!_id) {
      return res.status(400).json({ status: false, message: "User not found" });
    }

    // find by company post
    const jobPost = await JobPost.find({ company: _id });

    // filter by id
    let edit = jobPost.filter((item) => item._id == jobId);

    const update = await JobPost.findByIdAndUpdate(edit[0]._id, req.body, {
      new: true,
    });

    return res
      .status(200)
      .json({ status: true, message: "get company job post", update });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};
// delete job post with filter
export const deleteJob = async (req, res) => {
  try {
    const _id = req.user._id;
    const jobId = req.params.jobId;

    if (!_id) {
      return res.status(400).json({ status: false, message: "User not found" });
    }

    // find by company post
    const jobPost = await JobPost.find({ company: _id });

    // filter by id
    let remove = jobPost.filter((item) => item._id == jobId);

    remove = await JobPost.findByIdAndDelete(remove[0]._id);

    return res
      .status(200)
      .json({ status: true, message: "job delete", remove });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

//  ++++++ users applying jobs details

// get all applications jobs details
export const usersApply = async (req, res) => {
  try {
    const _id = req.user._id;

    if (!_id) {
      return res.status(400).json({ status: false, message: "User not found" });
    }

    const jobs = await JobPost.findById({ _id: req.params.jobId });

    const { userAppliedJob } = jobs;

    return res
      .status(200)
      .json({ status: true, message: "get company job post", userAppliedJob });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

// get all applications jobs details
// http://127.0.0.1:8080/api/v1/company/jobs/:jobId/applications/:applicationId
export const getSingleApply = async (req, res) => {
  try {
    const _id = req.user._id;

    if (!_id) {
      return res.status(400).json({ status: false, message: "User not found" });
    }

    const jobs = await JobPost.findById({ _id: req.params.jobId });

    if (!jobs) {
      return res
        .status(400)
        .json({ status: false, message: " jobs not found" });
    }

    const { userAppliedJob } = jobs;

    const user = userAppliedJob.find(
      (job) => job.userId == req.params.applicationId
    );

    console.log(user.status);

    return res
      .status(200)
      .json({ status: true, message: "get single application job", user });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

// change status application user details
// http://127.0.0.1:8080/api/v1/company/jobs/:jobId/applications/:applicationId/status
export const statusUpdateApply = async (req, res) => {
  try {
    const _id = req.user._id;
    const { jobId } = req.params;

    if (!_id) {
      return res.status(400).json({ status: false, message: "User not found" });
    }

    const applyJobs = await JobPost.findById(jobId);

    if (!applyJobs) {
      return res
        .status(400)
        .json({ status: false, message: " jobs not found" });
    }

    // find single user applied jobs
    const jobs = applyJobs.userAppliedJob.find(
      (job) => job.userId == req.params.applicationId
    );

    // console.log(jobs._id);

    applyJobs.userAppliedJob.filter((job) => {
      // filter jobs detail and update status
      if (job.userId == req.params.applicationId && jobs._id == job._id) {
        // only spacific user update status
        job.status = req.body.status;
      }
    });

    // find user applied jobs to change status
    const user = await Users.findById(req.params.applicationId);

    const userApply = user.appliedJobs.find((user) => user.jobId == jobId);

    user.appliedJobs.filter((user) => {
      if (user.jobId == jobId) {
        user.status = req.body.status;
        console.log(user);
      }
    });

    // console.log(userApply.jobId);
    // user status change
    await user.save();
    // job company  status change
    await applyJobs.save();

    return res
      .status(200)
      .json({ status: true, message: "application job status update ", jobs });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};
