import jwt from "jsonwebtoken";
import Users from "../model/jobSekeer/userSchema.js";
import Admin from "../model/admin/adminSchema.js";
import { Company } from "../model/company/companySchema.js";

export const isUserAuth = async (req, res, next) => {
  try {
    // get token in cookies to req.cookies
    const { token } = req.cookies;

    if (!token) {
      return res.status(403).json({ status: false, message: "user not login" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await Users.findById(decode._id);

    next();
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

//
export const isCompAuth = async (req, res, next) => {
  try {
    // get token in cookies to req.cookies
    const { token } = req.cookies;

    if (!token) {
      return res.status(403).json({ status: false, message: "user not login" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(token);

    // console.log(decode._id);
    req.user = await Company.findById(decode._id);
    next();
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const isAdminAuth = async (req, res, next) => {
  try {
    // get token in cookies to req.cookies
    const { token } = req.cookies;

    if (!token) {
      return res.status(403).json({ status: false, message: "user not login" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await Admin.findById(decode._id);

    next();
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
