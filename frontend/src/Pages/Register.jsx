import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/Register.css";

function Register() {
  const [accountNumber, setAccountNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

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
    
        if (!response.ok) {
          throw new Error('Failed to submit form');
        }
    
        // Handle success response
        console.log('Form data submitted successfully');
      } catch (error) {
        console.error('Error submitting form:', error.message);
      }
    };

  return (
    <div className="background d-flex flex-column justify-content-center align-items-center ">
      <form onSubmit={handleSubmit} action="post" className="form-elements">
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
          onChange={(e) => setEmail(e.target.value)}
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
