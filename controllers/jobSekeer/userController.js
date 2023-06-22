// import UserSchema from "../../model/jobSekeer/userSchema.js";
import Users from "../../model/jobSekeer/userSchema.js";
import bcrypt from "bcryptjs";
import { sendToken } from "../../sendToken/sendToken.js";

export const userRegister = async (req, res) => {
  try {
    const { name, email } = req.body;
    console.log(name, email);

    let user = await Users.findOne({ email });

    // chack user already exist or not
    if (user) {
      return res.status(400).json({
        status: false,
        message: "User Already Exist",
      });
    }

    console.log(user);

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    // const salt = await bcrypt.getSalt(10);
    // const password = await bcrypt.hash(req.body.password, salt);

    user = await Users.create({
      name,
      email,
      password,
    });

    // res.status(200).json({ name, email, password });
    sendToken(res, user, 200, "User register succefully!");
  } catch (error) {
    console.log(error.message);
  }
};
