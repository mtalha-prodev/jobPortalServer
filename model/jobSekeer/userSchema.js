import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
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
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: false,
      },
      description: {
        type: String,
        required: false,
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldOfStudy: {
        type: String,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: false,
      },
      description: {
        type: String,
        required: false,
      },
    },
  ],
  appliedJobs: [
    {
      jobId: {
        type: Schema.Types.ObjectId,
        ref: "Job",
        required: true,
      },
      applicationDate: {
        type: Date,
        required: true,
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
        required: true,
      },
      savedDate: {
        type: Date,
        required: true,
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

// UserSchema.methods.isMatchPassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

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
