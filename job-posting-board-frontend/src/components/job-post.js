import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";
import bg1 from "../images/purplebg1.jpg";

const JobPost = () => {
    const [jobDetails, setJobDetails] = useState({
        title: "",
        description: "",
        experience: "",
        emails: "",
        endDate: "",
    });
    const [message, setMessage] = useState(""); // For feedback messages
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const handleChange = (e) => {
        setJobDetails({ ...jobDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Convert comma-separated emails into an array
        const emailArray = jobDetails.emails.split(",").map(email => email.trim());

        try {
            await axios.post("http://localhost:5000/api/jobs/job-posting", {
                ...jobDetails,
                emails: emailArray // Pass the email array
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage("Job posted and emails sent!"); // Set success message
            // Clear the form after successful submission
            setJobDetails({ title: "", description: "", experience: "", emails: "", endDate: "" });
        } catch (error) {
            console.error("Error posting job", error);
            setMessage("Error posting job. Please try again."); // Set error message
        }
    };
    const onSumit = () => {
        setMessage(false);
        setJobDetails({ title: "", description: "", experience: "", emails: "", endDate: "" });


    };
    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token from local storage
        navigate("/"); // Redirect to login page
    };
    return (
        <div className="homebg">
            <div className="logout-container">
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
            <div className="form-container1">
                <h2>Post a Job</h2>
                {message && <p className="message">{message}</p>} {/* Feedback message */}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Job Title"
                        onChange={handleChange}
                        value={jobDetails.title}
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Job Description"
                        onChange={handleChange}
                        value={jobDetails.description}
                        required
                    />
                    <input
                        type="text"
                        name="experience"
                        placeholder="Experience Level"
                        onChange={handleChange}
                        value={jobDetails.experience}
                        required
                    />
                    <input
                        type="text" // Changed to text to handle comma-separated values
                        name="emails"
                        placeholder="Candidate Emails (comma separated)"
                        onChange={handleChange}
                        value={jobDetails.emails}
                        required
                    />
                    <input
                        type="date"
                        name="endDate"
                        onChange={handleChange}
                        value={jobDetails.endDate}
                        required
                    />
                    <div className="button-container">
                        <button type="submit">Post Job</button>
                    </div>
                </form>
            </div>
            {message && (
                <div className="popup-message">
                    <p>Job Posted Successfully</p>
                    <button type="button" onClick={onSumit}>Ok</button>
                </div>
            )}
        </div>
    );
};

export default JobPost;
