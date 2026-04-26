const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const caseRoutes = require("./routes/CaseRoutes");
const volunteerRoutes = require("./routes/VolunteerRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("ImpactGrid API is running");
});

app.use("/api/cases", caseRoutes);
app.use("/api/volunteers", volunteerRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:", err);
  });