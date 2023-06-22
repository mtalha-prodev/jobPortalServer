import mongoose from "mongoose";

const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
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
  address: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },

  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: [String],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  employmentType: {
    type: String,
    enum: ["full-time", "part-time", "contract", "internship"],
    required: true,
  },
  experienceLevel: {
    type: String,
    enum: ["entry-level", "mid-level", "senior-level"],
    required: true,
  },
  educationLevel: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
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
    default: "user",
  },
});

export default mongoose.model("Company", companySchema);
