import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "", password: "" });
  const [successMessage, setSuccessMessage] = useState(false); // State to handle success message
  const [errorMessage, setErrorMessage] = useState(""); // State to handle error messages
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", formData);
      console.log(formData)
      if (response.data.success) {
        setSuccessMessage(true); // Show success message
        setFormData({ name: "", email: "", mobile: "", password: "" }); // Reset form
        setErrorMessage(""); // Clear error message
      } else {
        setErrorMessage(response.data.message); // Display any error message from the server
      }
    } catch (error) {
      console.error("Error during registration", error);
      setErrorMessage("Registration failed. Please try again."); // Handle error
    }
  };

  const handleLoginRedirect = () => {
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="register-container">
      <div className="form-box">
        <h2>Company Registration</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Company Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>

      {successMessage && (
        <div className="popup-message">
          <p>Registered successfully!</p>
          <button onClick={handleLoginRedirect}>Go to Login</button>
        </div>
      )}
    </div>
  );
};

export default Register;
