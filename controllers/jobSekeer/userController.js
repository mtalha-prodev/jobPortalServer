// import UserSchema from "../../model/jobSekeer/userSchema.js";
import Users from "../../model/jobSekeer/userSchema.js";
import bcrypt from "bcryptjs";
import { sendToken } from "../../sendToken/sendToken.js";

export const register = async (req, res) => {
  try {
    const { username, email,contactNumber } = req.body;
  

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
    const { email,password } = req.body;
  

    let user = await Users.findOne({ email });

    // chack user already exist or not
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User not Exist",
      });
    }

    const isMatch = await bcrypt.isMatchPassword(password)

    if(!isMatch) {
      return res.status(400).json({status:false,message:"wrong email or password"});

    }


    // res.status(200).json({ name, email, password });
    sendToken(res, user, 200, "User login succefully!");
  } catch (error) {
    console.log(error.message);
  }
};
