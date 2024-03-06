import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Components/Loading/Loading";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/SignIn.css";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      username: username,
      password: password,
    };

    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        const data = await response.json(); // Parse response body as JSON
        console.log("Sign in successful", data.token);
        localStorage.setItem("token", data.token);
        navigate("/account");
      }
      else if (response.status === 401) {
        const data = await response.json();
        setMessage(data.message);
      }
      else if (response.status === 500) {
        const data = await response.json();
        setMessage(data.message);
      }
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      console.log("Form data submitted successfully");
    } catch (err) {
      console.error("Error submitting form:", err.message);
    }
    setLoading(false);
  };

  if(loading) {
    return <Loading />
  };

  return (
    <div className="row signin m-0">
      <div className="col-md-8 col-sm-12 mx-auto signin-left p-0">
        <h1>Sign In</h1>
        {message && <div className="alert alert-danger">{message}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          ></input>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            {!showPassword ? (
              <i
                className="far fa-eye eye-icon-signin"
                onClick={togglePasswordVisibility}
              ></i>
            ) : (
              <i
                className="fa-regular fa-eye-slash eye-icon-signin"
                onClick={togglePasswordVisibility}
              ></i>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </form>
      </div>
      <div className="col-md-4 col-sm-12 mx-auto signin-right p-0">
        <h1>Are you new to online banking?</h1>
        <a href="/register" className="btn btn-primary">
          Register Now
        </a>
      </div>
    </div>
  );
}

export default SignIn;
