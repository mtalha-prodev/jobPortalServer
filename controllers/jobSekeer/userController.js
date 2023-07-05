// import UserSchema from "../../model/jobSekeer/userSchema.js";
import Users from "../../model/jobSekeer/userSchema.js";
import bcrypt from "bcryptjs";
import { sendToken } from "../../sendToken/sendToken.js";

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

    let user = await Users.findOne({ email });

    // chack user already exist or not
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User not Exist",
      });
    }

    const isMatch = await user.isMatchPassword(password);

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
