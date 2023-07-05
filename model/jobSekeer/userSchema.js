import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    select: false,
  },
  contacNumber: {
    type: String,
    require: true,
  },
  firstName: {
    type: String,
    require: true,
    default: "",
  },
  lastName: {
    type: String,
    require: true,
    default: "",
  },
  dateOfBirth: {
    type: Date,
    default: "",
    require: true,
  },
  location: {
    type: String,
    require: true,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  skills: {
    type: [String],
    default: [],
  },
  experience: [
    {
      title: {
        type: String,
        require: true,
        default: "",
      },
      company: {
        type: String,
        require: true,
        default: "",
      },
      startDate: {
        type: Date,
        require: true,
        default: "",
      },
      endDate: {
        type: Date,
        require: false,
        default: "",
      },
      description: {
        type: String,
        require: false,
        default: "",
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
        require: true,
        default: "",
      },
      degree: {
        type: String,
        require: true,
        default: "",
      },
      fieldOfStudy: {
        type: String,
        require: true,
        default: "",
      },
      startDate: {
        type: Date,
        require: true,
        default: "",
      },
      endDate: {
        type: Date,
        require: false,
        default: "",
      },
      description: {
        type: String,
        require: false,
        default: "",
      },
    },
  ],
  appliedJobs: [
    {
      jobId: {
        type: Schema.Types.ObjectId,
        ref: "Job",
        require: true,
      },
      applicationDate: {
        type: Date,
        default: Date.now,
      },
      status: {
        type: String,
        enum: ["applied", "shortlisted", "rejected"],
        default: "applied",
      },
    },
  ],
  savedJobs: [
    {
      jobId: {
        type: Schema.Types.ObjectId,
        ref: "Job",
        require: true,
      },
      savedDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  verified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "user",
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.isMatchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_COOKIE_EXPIRY * 24 * 60 * 60 * 1000,
  });
};

export default mongoose.model("User", userSchema);

// In this schema, we define various properties for the user, such as username, email, password, firstName, lastName, dateOfBirth, location, bio, skills, experience, education, and createdOn. The experience and education fields are arrays of objects representing the user's work experience and education history, respectively.
// In this updated schema, I have added two additional fields: appliedJobs and savedJobs.
// The appliedJobs field is an array that stores the jobs to which the user has applied. Each element in the array is an object that contains the jobId, a reference to the corresponding Job model, applicationDate, and status, which represents the application status and can have values of 'applied', 'shortlisted', or 'rejected'.
// The savedJobs field is an array that stores the jobs that the user has saved for later. Each element in the array contains the jobId and savedDate.
// These additions allow users to apply to jobs and save jobs for future reference. The ref property within the jobId field specifies the reference to the Job model, assuming you have a separate Job model defined.
// Remember to install and require the necessary dependencies, such as mongoose and Schema, for this code
