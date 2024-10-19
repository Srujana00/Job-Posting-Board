import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";
import bg1 from "../images/purplebg1.jpg";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

      const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
          if (response.data.token) {
            localStorage.setItem("token", response.data.token); // Store JWT token
            console.log("LOgin Successfully")
            navigate("/job-posting");
          }
        //   else if(response.data.message === "Company doesn't exist"){
        //     setErrorMessage('With these ceredenitals no data found in our recoeds')
        //   }
        } catch (error) {
          console.error("Login error", error);
        }
      };

    return (
        <div className="homebg">
            <div className="container">
                <div className="whitebg">
                    <div className="login-section">
                        <h2 style={{ fontFamily: "-moz-initial", color: '#BF40BF' }}>Hello</h2>
                        <h1 style={{ fontFamily: "bold", color: '#BF40BF', marginTop: '2px' }}> Welcome!</h1>
                        <form>
                            <input
                                type="email"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <div className="button-container">
                                <button type="submit" onClick={handleLogin}>Login</button>
                                <button type="button" onClick={() => navigate("/register")}>SignUp</button>
                            </div>
                        </form>
                    </div>
                    <div className="image-section">
                        <img src={bg1} alt="Login illustration" />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Login;
