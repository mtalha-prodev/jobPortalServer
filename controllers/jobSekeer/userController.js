// import UserSchema from "../../model/jobSekeer/userSchema.js";
import Users from "../../model/jobSekeer/userSchema.js";
import bcrypt from "bcryptjs";
import { sendToken } from "../../sendToken/sendToken.js";
import { JobPost } from "../../model/company/companySchema.js";

export const register = async (req, res) => {
  try {
    const { username, email, contactNumber } = req.body;

    let user = await Users.findOne({ email });

    // chack user already exist or not
    if (user) {
      return res.status(400).json({
        status: false,
        message: "User Already Exist",
      });
    }

    // console.log(user);

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    user = await Users.create({
      username,
      email,
      password,
      contactNumber,
    });

    // res.status(200).json({ name, email, password });
    sendToken(res, user, 200, "User register succefully!");
  } catch (error) {
    console.log(error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await Users.findOne({ email }).select("+password");

    // chack user already exist or not
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User not Exist",
      });
    }

    // console.log(user);

    const isMatch = await user.isMatchPassword(password);

    // console.log(isMatch);

    if (!isMatch) {
      return res
        .status(400)
        .json({ status: false, message: "wrong email or password" });
    }

    // res.status(200).json({ name, email, password });
    sendToken(res, user, 200, "User login succefully!");
  } catch (error) {
    console.log(error.message);
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
export const getUser = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ status: false, message: "user not found!" });
    }

    const _id = req.user._id;

    // console.log(req.user.email);
    const user = await Users.findById({ _id });

    // console.log(user);
    res.status(404).json({ status: false, user, message: "user profile" });
  } catch (error) {
    res.status(404).json({ status: false, message: error.message });
  }
};

// update company details
export const updateUser = async (req, res) => {
  try {
    const _id = req.user._id;

    if (!_id) {
      return res.status(400).json({ status: true, message: " user not found" });
    }

    let update = await Users.find({ _id });

    // console.log(update[0]._id);

    update = await Users.findByIdAndUpdate(update[0]._id, req.body, {
      new: true,
    });

    res
      .status(200)
      .json({ status: true, update, message: "User updated successfully" });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};
// change user password
export const changePassword = async (req, res) => {
  try {
    const _id = req.user._id;

    if (!_id) {
      return res.status(400).json({ status: true, message: " user not found" });
    }

    let update = await Users.find({ _id });

    // console.log(update[0]._id);
    const salt = await bcrypt.genSalt(10);

    let password = await bcrypt.hash(req.body.password, salt);

    update = await Users.findByIdAndUpdate(
      update[0]._id,
      { password },
      {
        new: true,
      }
    );

    res.status(200).json({
      status: true,
      update,
      message: "User password updated successfully",
    });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};
// company account delete
export const deleteUser = async (req, res) => {
  try {
    const _id = req.user._id;

    if (!_id) {
      return res.status(400).json({ status: true, message: "user not found" });
    }

    let del = await Users.findById({ _id });
    console.log(del);

    del = await Users.findByIdAndDelete(del._id);

    res
      .status(200)
      .json({ status: true, message: "User deleted successfully", del });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

// USER JOBS SEARCHING

export const searchJobs = async (req, res) => {
  try {
    console.log(req.params.key);
    // search for jobs
    const jobs = await JobPost.find({
      $or: [
        { title: { $regex: req.params.key } },
        { location: { $regex: req.params.key } },
        { category: { $regex: req.params.key } },
      ],
    });

    res
      .status(200)
      .json({ status: true, message: "jobs access successfuly ", jobs });
  } catch (error) {
    return res.status(400).json({ status: false, message: error });
  }
};

// apply user jobs
export const applyJobs = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { name, email, location } = req.body;

    // find user to apply jobs
    const user = await Users.findById(req.user._id);
    const { appliedJobs } = user;
    // console.log(appliedJobs);

    // jobId push user applied jobs
    user.appliedJobs.push({
      jobId: jobId,
      status: "applied",
      applicationDate: new Date(Date.now()),
    });

    // console.log(jobId);
    // console.log(name, email, location);

    await user.save();

    res.status(200).json({
      status: true,
      user,
      message: "jobs apply successfuly",
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

// save jobs to user
export const saveJobs = async (req, res) => {
  try {
    const { jobId } = req.params;

    // find user to save jobs
    const user = await Users.findById(req.user._id);

    // jobId push user applied jobs
    user.savedJobs.push({
      jobId: jobId,
      savedDate: new Date(Date.now()),
    });

    await user.save();

    res.status(200).json({
      status: true,
      user,
      message: "jobs save successfuly",
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

// get save jobs to user
export const getApplyJobs = async (req, res) => {
  try {
    // find user to save jobs
    const user = await Users.findById(req.user._id);

    // get applied jobs
    const { appliedJobs } = user;

    res.status(200).json({
      status: true,
      appliedJobs,
      message: "appied job get successfuly",
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};
// get save jobs to user
export const getSaveJobs = async (req, res) => {
  try {
    // find user to save jobs
    const user = await Users.findById(req.user._id);

    // get saved jobs
    const saveJobs = user.savedJobs;

    res.status(200).json({
      status: true,
      saveJobs,
      message: "jobs save successfuly",
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};
