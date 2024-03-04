import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {checkToken} from "../Tokens/CheckToken";
import "bootstrap/dist/css/bootstrap.min.css";

function AccountDetails() {
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
  },[navigate]);
  console.log(user);
  if (!user) {
    return (
      <div className="background w-100 d-flex flex-column justify-content-center align-items-center">
        <h1 className="text-white">Loading...</h1>
      </div>
    );
  }
  return (
    <div className="background w-100 d-flex flex-column justify-content-center align-items-center">
      <div className="box">
        <h2 className="text-white">Account Details</h2>
        <h4>Account No: {user.accountID}</h4>
        <h4>Branch: {user.branch}</h4>
        <h4>Account Holder Name: {user.name}</h4>
        <h4>Total Avilable Balance: LKR {user.balance}</h4>
      </div>
    </div>
  );
}

export default AccountDetails;
