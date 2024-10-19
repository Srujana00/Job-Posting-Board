const Company = require("../models/Company");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();
// exports.register = async (req, res) => {
//   const { name, email, mobile, password } = req.body;
//   try {
//     const company = new Company({ name, email, mobile, password });
//     await company.save();

//     // Send email verification
//     let transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     let info = await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Email Verification",
//       text: "Please verify your email.",
//     });

//     res.status(201).json({ success: true, message: "Company registered, please verify your email." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };
exports.register = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  try {
    const company = new Company({ name, email, mobile, password });
    await company.save();

    // Send email verification code here...

    res.status(201).json({ success: true, message: "Company registered successfully!" });
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate email error
      return res.status(400).json({ success: false, message: "Email already exists!" });
    }
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};




exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find the company by email
        const company = await Company.findOne({ email });
        if (!company) {
            return res.status(400).json({ success: false, message: "Company doesn't exist" });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, company.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Create a JWT token
        const token = jwt.sign({ companyId: company._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};