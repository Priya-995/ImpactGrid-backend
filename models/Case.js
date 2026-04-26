const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema(
  {
    // Frontend id (optional but keep for mapping)
    id: {
      type: String,
      required: true,
      unique: true,
    },

    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["Food", "Medical", "Education", "Shelter", "Rescue"],
      required: true,
    },

    urgency: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    peopleAffected: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    skills: [
      {
        type: String,
      },
    ],

    reportedAt: {
      type: String, // "2h ago" (UI purpose)
    },

    status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved"],
      default: "Open",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Case", caseSchema);