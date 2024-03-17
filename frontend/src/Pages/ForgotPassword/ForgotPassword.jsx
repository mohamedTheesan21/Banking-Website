import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from "../../Components/Loading/Loading";

function ForgotPassword() {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      userName,
    };

    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/user/forgot%20password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log("Form data submitted successfully", data);
        localStorage.setItem("userToken", data.token);
        navigate("/FPVerification")
      } else if (response.status === 404) {
        console.log("User does not exist");
        setError(
          "User does not match with our records. Please try again. if you don't have an account, please go to the nearest branch to open an account. Thank you."
        );
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (err) {
      console.error("Error submitting form:", err.message);
    }
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="background-full d-flex flex-column justify-content-center align-items-center ">
      <div className="account-box px-5 w-50 ">
        <p>
          To reset your password, submit your username below. If we can find you
          in the database, an email will be sent to your email address, with
          verification code.
        </p>
        {error && <p className="text-danger">{error}</p>}
        <form onSubmit={handleSubmit} action="post" className="form-elements">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="form-control"
            placeholder="Enter Account Number"
            required
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
