const express = require("express");
const { postJob } = require("../controllers/jobController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/job-posting", authMiddleware, postJob);

module.exports = router;
