const express = require("express");
const router = express.Router();
const Volunteer = require("../models/Volunteer");

// 🔹 CREATE VOLUNTEER
router.post("/", async (req, res) => {
  try {
    const newVolunteer = new Volunteer(req.body);
    await newVolunteer.save();

    res.status(201).json({
      message: "Volunteer registered successfully",
      data: newVolunteer,
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to register volunteer",
      message: err.message,
    });
  }
});

// 🔹 GET ALL VOLUNTEERS
router.get("/", async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });

    res.json({
      count: volunteers.length,
      data: volunteers,
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch volunteers",
      message: err.message,
    });
  }
});


module.exports = router;