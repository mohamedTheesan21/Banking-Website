import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Components/Loading/Loading";
import { checkToken } from "../Tokens/CheckToken";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/SignUp.css";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkToken("registerToken");
    const token = localStorage.getItem("registerToken");
    if (!token) {
      navigate("/register");
    }
  },[navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Password and confirm password didn't match");
    } else {
      setError("");
      const formData = {
        username: username,
        password: password,
      };

      const token = localStorage.getItem("registerToken");
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3001/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
        if (response.status === 200) {
          const data = await response.json(); // Parse response body as JSON
          console.log("Sign in successful", data.token);
          localStorage.setItem("token", data.token);
          localStorage.removeItem("registerToken");
          localStorage.removeItem("emailVerified");
          navigate("/account");
        } else if (response.status === 400) {
          const data = await response.json();
          setError(data.message);
        } else if (response.status === 403) {
          alert("session expired");
          navigate("/register");
        }
        if (!response.ok) {
          throw new Error("Failed to submit form");
        }
        console.log("Form data submitted successfully");
      } catch (err) {
        console.error("Error submitting form:", err.message);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("registerToken");
    if (!token) {
      navigate("/register");
    }
  }, [navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="background-full w-100 d-flex flex-column justify-content-center align-items-center">
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
          {error && <p className="error-text text-danger">{error}</p>}
          <button type="submit" className="btn btn-primary">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
