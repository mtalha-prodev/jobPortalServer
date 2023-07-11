import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    // unique: true,
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
  address: {
    type: String,
    require: true,
    default: "",
  },
  industry: {
    type: String,
    require: true,
    default: "",
  },
  website: {
    type: String,
    default: "",
  },
  contactNumber: {
    type: String,
    require: true,
  },
  active: {
    type: Boolean,
    default: true,
    default: false,
  },

  expiresAt: {
    type: Date,
    default: Date.now,
  },
  isClosed: {
    type: Boolean,
    default: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "Company",
  },
});

const jobSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
    require: true,
  },

  title: {
    type: String,
    require: true,
    default: "",
  },
  description: {
    type: String,
    require: true,
    default: "",
  },
  requirements: {
    type: [String],
    require: true,
    default: "",
  },
  location: {
    type: String,
    require: true,
    default: "",
  },
  employmentType: {
    type: String,
    enum: ["full-time", "part-time", "contract", "internship"],
    require: true,
    default: "full-time",
  },
  experienceLevel: {
    type: String,
    enum: ["entry-level", "mid-level", "senior-level"],
    require: true,
    default: "entry-level",
  },
  educationLevel: {
    type: String,
    require: true,
    default: "",
  },
  skills: {
    type: [String],
    require: true,
    default: "",
  },
  // user applications details
  userAppliedJob: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true,
      },
      name: String,
      email: String,
      location: String,
      education: [],
      experience: [],
      skills: [String],
      status: {
        type: String,
        enum: ["applied", "shortlisted", "rejected"],
        default: "applied",
      },
      applyAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  postedAt: {
    type: Date,
    default: Date.now,
  },
});

companySchema.methods.isMatchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

companySchema.methods.getJwtToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_COOKIE_EXPIRY * 24 * 60 * 60 * 1000,
  });
};

export const Company = mongoose.model("company", companySchema);
export const JobPost = mongoose.model("companyJobPost", jobSchema);
