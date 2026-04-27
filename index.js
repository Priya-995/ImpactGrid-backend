const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const caseRoutes = require("./routes/CaseRoutes");
const volunteerRoutes = require("./routes/VolunteerRoutes");

dotenv.config();
const app = express();

// CORS
const allowedOrigins = ["http://localhost:8080", "http://localhost:5173"];
const vercelPreview = /^https:\/\/.*\.vercel\.app$/;

app.options("*", cors());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || vercelPreview.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin}`));
    }
  },
  credentials: true,
}));

app.use(express.json());

// ✅ Cached connection — critical for Vercel serverless
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log("✅ MongoDB Connected");
};

// ✅ Connect before every request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("❌ DB Error:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.get("/", (req, res) => res.send("ImpactGrid API is running"));
app.use("/api/cases", caseRoutes);
app.use("/api/volunteers", volunteerRoutes);

// ✅ Export instead of app.listen() — Vercel handles the server
module.exports = app;
