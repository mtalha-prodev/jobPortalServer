import Company from "../../model/company/companySchema.js";
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
