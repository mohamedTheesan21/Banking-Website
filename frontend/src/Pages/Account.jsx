import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../Tokens/CheckToken";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/Account.css";

function Account() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    checkToken("token");
    // Retrieve JWT token from local storage
    const token = localStorage.getItem("token");

    if (token) {
      // Send request to backend with token in the Authorization header
      fetch("http://localhost:3001/account", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          setUser(data.user);
        } else if (response.status === 404) {
          navigate("/signin");
        } else {
          throw new Error("Failed to load account details");
        }
      });
    } else {
      navigate("/signin");
    }
  }, [navigate]);

  const handleClick = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");

    // Redirect the user to the sign-in page
    navigate("/signin");
  };

  // Check if user is null
  if (!user) {
    return (
      <div className="background w-100 d-flex flex-column justify-content-center align-items-center">
        <h1 className="text-white">Loading...</h1>
      </div>
    );
  }

  const balance = user.balance || 0;

  return (
    <div className="background w-100 d-flex flex-column justify-content-center align-items-center">
      <h1 className="text-white shadow-lg ">Hello, {user.name}</h1>
      <div className="row m-0 box">
        <div className="col-md-6 col-sm-12 mx-auto center">
          <h2 className="text-black">Account Balance:LKR {balance}</h2>
        </div>
        <div className="col-md-6 col-sm-12 mx-auto center account-links">
          <a href="/account/details" className="btn btn-primary">
            Account Details
          </a>
          <a href="/account/transfer" className="btn btn-primary ">
            Transfers
          </a>
        </div>
      </div>
      <div>
        <button className="btn btn-danger mt-5" onClick={handleClick}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Account;
