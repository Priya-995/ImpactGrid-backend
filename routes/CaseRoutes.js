const express = require("express");
const router = express.Router();
const Case = require("../models/Case");

router.post("/", async (req, res) => {
  try {
    const newCase = new Case(req.body);
    await newCase.save();

    res.status(201).json({
      message: "Case created successfully",
      data: newCase,
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to create case",
      message: err.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const cases = await Case.find().sort({ createdAt: -1 });

    res.json({
      count: cases.length,
      data: cases,
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch cases",
      message: err.message,
    });
  }
});

module.exports = router;