import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    select:false
  },
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: ["admin", "superadmin"],
    default: "admin",
  },
  verified:{
    type: Boolean,
    default:false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

adminSchema.methods.isMatchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

adminSchema.methods.getJwtToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_COOKIE_EXPIRY * 24 * 60 * 60 * 1000,
  });
};



export default mongoose.model("admin", adminSchema);

// In this admin schema, we define properties such as username, email, password, firstName, lastName, role, and createdOn. The role field specifies the role of the admin and can have values of 'admin' or 'superadmin'.

// This schema provides basic information about the admin and can be expanded to include additional fields as per your specific requirements.

// Remember to install and require the necessary dependencies, such as mongoose and Schema, for this code to work properly.
