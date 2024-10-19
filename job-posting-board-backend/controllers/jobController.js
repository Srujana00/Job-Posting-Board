const Job = require("../models/Job");
const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables

exports.postJob = async (req, res) => {
  const { title, description, experience, emails, endDate } = req.body;
  const companyId = req.company.companyId;

  try {
    const job = new Job({
      title,
      description,
      experience,
      emails,
      endDate,
      company: companyId,
    });
    await job.save();

   
    console.log(process.env.EMAIL_USER);

    
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, 
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    emails.forEach(async (email) => {
      console.log(email);
      try {
        const info = await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: `New Job Alert: ${title}`,
          text: `You have been invited to apply for the position of ${title}.`,
          html: `<b>Job Title:</b> ${title}<br><b>Description:</b> ${description}<br><b>Experience:</b> ${experience}<br><b> Deadline Date: </b> ${endDate} <br> <b> Sender Information : </b> <br> <br> <b> sender email : <b> ${process.env.EMAIL_USER}`, // You can customize the email body as needed
        });
        console.log("Message sent: %s", info.messageId); 
      } catch (error) {
        console.error(`Error sending email to ${email}:`, error);
      }
    });

    res.status(201).json({ success: true, message: "Job posted and emails sent." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
