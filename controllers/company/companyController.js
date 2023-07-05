import { Company, JobPost } from "../../model/company/companySchema.js";
import bcrypt from "bcryptjs";
import { sendToken } from "../../sendToken/sendToken.js";

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
    res.status(404).json({ status: false, user, message: "user get" });
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

    let update = await Company.find({ _id });

    // console.log(update[0]._id);

    update = await Company.findByIdAndUpdate(update[0]._id, req.body, {
      new: true,
    });

    res
      .status(200)
      .json({ status: true, update, message: "Company updated successfully" });
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

    let del = await Company.findById({ _id });
    console.log(del);

    del = await Company.findByIdAndDelete(del._id);

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
