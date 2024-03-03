import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useEmail } from "../Contexts/EmailContext";
import { useAuth } from "../Contexts/Auth";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/SignUp.css";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { email } = useEmail();
  const  {isAuthenticated, login} = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Password and confirm password didn't match");
    } else {
      setError("");
      const formData = {
        username: username,
        email: email,
        password: password,
      };

      try {
        const response = await fetch("http://localhost:3001/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.status === 200) {
          login();
        }
        if (!response.ok) {
          throw new Error("Failed to submit form");
        }
        console.log("Form data submitted successfully");
      } catch (err) {
        console.error("Error submitting form:", err.message);
      }
    }
  };

  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated);
    if (isAuthenticated) {
      navigate("/account");
    }
  }, [isAuthenticated, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <div className="background w-100 d-flex flex-column justify-content-center align-items-center">
      <div className="signup mx-auto">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit} action="post">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
            placeholder="Username"
          ></input>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Password"
            />
            {!showPassword ? (
              <i
                className="far fa-eye eye-icon"
                onClick={togglePasswordVisibility}
              ></i>
            ) : (
              <i
                className="fa-regular fa-eye-slash eye-icon"
                onClick={togglePasswordVisibility}
              ></i>
            )}
          </div>
          <div style={{ position: "relative" }}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control"
              placeholder="Confirm Password"
            />
            {!showConfirmPassword ? (
              <i
                className="far fa-eye eye-icon"
                onClick={toggleConfirmPasswordVisibility}
              ></i>
            ) : (
              <i
                className="fa-regular fa-eye-slash eye-icon"
                onClick={toggleConfirmPasswordVisibility}
              ></i>
            )}
          </div>
          {{ error } && <p className="error-text text-danger">{error}</p>}
          <button type="submit" className="btn btn-primary">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
