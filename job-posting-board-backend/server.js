// const express = require("express");
// const connectDB = require("./config/db");
// const authRoutes = require("./routes/auth");
// const jobRoutes = require("./routes/job");

// const app = express();
// connectDB();

// app.use(express.json());
// app.use("/api/auth", authRoutes);
// app.use("/api/jobs", jobRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require("express");
const cors = require("cors"); // Import the CORS middleware
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/job");
const app = express();
connectDB();
// Use CORS middleware
app.use(cors({
  origin: "http://localhost:3000", // Allow requests from your frontend
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed HTTP methods
  credentials: true, // Allow credentials (like cookies) to be sent
}));

app.use(express.json()); // To parse JSON request bodies
// Your other middleware and routes go here
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
