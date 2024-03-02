import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/Register.css";
import { useEmail } from "../Contexts/EmailContext";

function Register() {
  const [accountNumber, setAccountNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const { setEmailForContext} = useEmail();
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      accountNumber,
      phoneNumber,
      email,
    };
    try {
        const response = await fetch('http://localhost:3001/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if(response.status === 200) {
          navigate("/verification");
        }

        if(response.status === 404) {
          console.log("User does not exist");
          setError ("User does not match with our records. Please try again. if you don't have an account, please go to the nearest branch to open an account. Thank you.");
        }
    
        if (!response.ok) {
          throw new Error('Failed to submit form');
        }
    
        // Handle success response
        console.log('Form data submitted successfully');
      } catch (err) {
        console.error('Error submitting form:', err.message);
      }
    };

  return (
    <div className="background d-flex flex-column justify-content-center align-items-center ">
      
      <form onSubmit={handleSubmit} action="post" className="form-elements">
      {error && <p className="error">{error}</p>}
        <input
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className="form-control"
          placeholder="Enter Account Number"
          required
        />
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="form-control"
          placeholder="Enter Phone Number"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => {setEmail(e.target.value); setEmailForContext(e.target.value)}}
          className="form-control"
          placeholder="Enter Email Address"
          required
        />
        <div className="row">
          <div className="col-md-6 d-flex justify-content-center">
            <a href="/signin" className="btn btn-light">
              Cancel
            </a>
          </div>
          <div className="col-md-6 d-flex justify-content-center">
            <button type="submit" className="btn btn-light">
              Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
