import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../Tokens/CheckToken";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/Verification.css";

function Verification() {
  const [error, setError] = useState("");
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [remainingTime, setRemainingTime] = useState(120);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      // Decrease remaining time every second
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    // Clear the timer when remainingTime reaches 0
    if (remainingTime === 0) {
      clearInterval(timer);
      // Redirect to another page after timeout
      navigate("/register");
    }

    // Clear the timer when the component unmounts
    return () => clearInterval(timer);
  }, [remainingTime, navigate]);



  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedTime = `${minutes}:${remainingSeconds}`;
    return formattedTime;
  }

  const handleChange = (e, index) => {
    const char = e.target.value.charAt(e.target.value.length - 1);
    setVerificationCode((prevCode) => {
      const newCode = [...prevCode]; // Copy the previous code array
      newCode[index] = char; // Update the character at the specified index
      return newCode; // Return the updated code array
    });
  };

  
  useEffect(() => {
    checkToken("registerToken");
    const token = localStorage.getItem("registerToken");
    console.log("Fetching account details", token);
    if (!token) {
      navigate("/register");
    }
  },[navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      verificationCode: verificationCode.join(""),
    };
    checkToken("registerToken");
    const token = localStorage.getItem("registerToken");
    try {
      const response = await fetch("http://localhost:3001/user/verify", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        navigate("/signup");
      }

      else if (response.status === 403) {
        const data = await response.json();
        console.log(data.message);
        navigate("/register");
      }

      else if (response.status === 404) {
        const data = await response.json();
        console.log(data.message);
        setError(data.message);
      }

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      // Handle success response
      console.log("Form data submitted successfully");
    } catch (err) {
      console.error("Error submitting form:", err.message);
    }
  };

  return (
    <div className="background w-100 d-flex flex-column justify-content-center align-items-center">
      <div className="verification d-flex flex-column justify-content-center align-items-center">
        <h1>One final step! We need to verify your email</h1>
        <p>Please check your email for a verification code</p>
        {error && <p className="error text-center ">{error}</p>}
        <div>
          {verificationCode.map((char, index) => (
            <input
              key={index}
              className="text-center"
              type="text"
              maxLength={1}
              value={char}
              onChange={(e) => handleChange(e, index)}
              style={{
                width: "40px",
                height: "40px",
                marginRight: "5px",
                fontSize: "25px",
                fontWeight: "bold",
                color: "darkblue",
              }}
            />
          ))}
        </div>
        <p className="mt-3">Verification code: {verificationCode.join("")}</p>
        <p
          className=""
          style={{ color: remainingTime <= 10 ? "red" : "green" }}
        >
          Time remaining: {formatTime(remainingTime)}{" "}
        </p>
        <form
          onSubmit={handleSubmit}
          action="post"
          className="form-elements d-flex justify-content-center m-0"
        >
          {verificationCode.join("").length === 6 && (
            <button type="submit" className="btn btn-primary m-0 ">
              Verify
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Verification;
