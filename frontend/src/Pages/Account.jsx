import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/Account.css";
// import { Link } from "react-router-dom";

function Account() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  useEffect(() => {
    console.log("Fetching account details");
    // Retrieve JWT token from local storage
    console.log("Token:", token);
    if (token) {
      // Send request to backend with token in the Authorization header
      fetch("http://localhost:3001/account", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(async (response) => {
          if (response.status === 200) {
            const data = await response.json();
            console.log("Account details:", data);
            setMessage(data.message);
            setUser(data.user);
          } else {
            throw new Error("Failed to load account details");
          }
        })
    } else {
      setError("Token not found");
      console.error("Token not found");
    }
  }, []);

  // Check if user is null
  if (!user) {
    return (
      <div className="background w-100 d-flex flex-column justify-content-center align-items-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  const balance = user.balance || 0;

  return (
    <div className="background w-100 d-flex flex-column justify-content-center align-items-center">
      <h1 className="text-white shadow-lg ">Hello, {user.name}</h1>
      <div className="row m-0 account">
        <div className="col-md-6 col-sm-12 mx-auto center">
          <h2 className="text-black">Account Balance:LKR {balance}</h2>
        </div>
        <div className="col-md-6 col-sm-12 mx-auto center account-links">
          <a href="/account/details" className="btn btn-primary">
            Account Details
          </a>
          <a href="/tranfer" className="btn btn-primary ">
            Transfers
          </a>
        </div>
      </div>
    </div>
  );
}

export default Account;
