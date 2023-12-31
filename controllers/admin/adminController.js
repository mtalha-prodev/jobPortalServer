import AdminModel from "../../model/admin/adminSchema.js";
import bcrypt from "bcryptjs";
import { sendToken } from "../../sendToken/sendToken.js";
import Users from "../../model/jobSekeer/userSchema.js";
import { Company, JobPost } from "../../model/company/companySchema.js";

// login admin
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "wrong email/password" });
    }

    // console.log(name, email);
    let user = await AdminModel.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "user not found!" });
    }

    const isMatch = await user.isMatchPassword(password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ status: false, message: "wrong email/password" });
    }

    sendToken(res, user, 200, "Login successful!");
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// admin register sub
export const register = async (req, res) => {
  try {
    const { email, firstName, lastName, username, role } = req.body;

    // // console.log(name, email);
    let user = await AdminModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ status: false, message: "User already found!" });
    }

    const salt = await bcrypt.genSalt(10);
    // console.log(admin);

    const password = await bcrypt.hash(req.body.password, salt);
    // console.log(password, name, email);

    if (!email || !password || !firstName || !lastName || !username) {
      return res
        .status(400)
        .json({ status: false, message: "require all field!" });
    }

    // console.log(email, firstName, lastName, username);
    const data = {
      email,
      password,
      username,
      firstName,
      lastName,
      role,
    };

    user = await AdminModel.create(data);

    // console.log(admin);

    sendToken(res, user, 200, "user register successful!");
  } catch (error) {
    res.status(500).json({ status: false, error: error });
  }
};

// logout admin
export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
      })
      .json({
        status: true,
        message: "User logged out successfully",
      });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    // const id = req.user._id;
    // console.log(id);

    const admin = await AdminModel.findById(req.user);
    console.log(admin);

    if (!admin) {
      return res
        .status(404)
        .json({ status: false, message: "user not found!" });
    }

    const jobs = await JobPost.find();

    if (!jobs) {
      return res
        .status(404)
        .json({ status: false, message: "jobs not found!" });
    }

    // console.log(jobs);

    return res
      .status(200)
      .json({ status: true, message: "get all jobs", jobs });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// get single job
export const singleJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const admin = await AdminModel.findById(req.user);
    // console.log(admin);

    if (!admin) {
      return res
        .status(404)
        .json({ status: false, message: "user not found!" });
    }

    const jobs = await JobPost.findById(jobId);

    if (!jobs) {
      return res.status(404).json({ status: false, message: "job not found!" });
    }

    // console.log(jobs);

    return res.status(200).json({ status: true, message: "get jobs", jobs });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
// delete job
export const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const admin = await AdminModel.findById(req.user);
    // console.log(admin);

    if (!admin) {
      return res
        .status(404)
        .json({ status: false, message: "user not found!" });
    }

    const jobs = await JobPost.findByIdAndDelete(jobId);

    // console.log(jobs);

    return res
      .status(200)
      .json({ status: true, message: "delete job successfuly", jobs });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
