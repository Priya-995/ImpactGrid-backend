const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
    },

    phone: {
      type: String,
    },

    location: {
      type: String,
      required: true,
    },

    skills: [
      {
        type: String,
      },
    ],

    availability: [
      {
        type: String,
      },
    ],

    preferredCause: {
      type: String,
      enum: ["Food", "Medical", "Education", "Shelter", "Rescue"],
    },

    distanceKm: {
      type: Number,
      default: 50,
    },

    status: {
      type: String,
      enum: ["Available", "Assigned", "Inactive"],
      default: "Available",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Volunteer", volunteerSchema);