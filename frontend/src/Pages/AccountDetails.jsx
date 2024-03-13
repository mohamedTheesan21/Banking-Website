import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {checkToken} from "../Tokens/CheckToken";
import Loading from "../Components/Loading/Loading"
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
  if (!user) {
    return <Loading />;
  }

  return (
    <div className="background w-100 d-flex flex-column justify-content-center align-items-center">
      <div className="box">
        <h2 className="text-white">Account Details</h2>
        <h4><span className="label">Account No:</span> <span className="text-white">{user.accountID}</span></h4>
      <h4><span className="label">Branch:</span> <span className="text-white">{user.branch}</span></h4>
      <h4><span className="label">Account Holder Name:</span> <span className="text-white">{user.name}</span></h4>
      <h4><span className="label">Total Available Balance:</span> <span className="text-white">LKR {user.balance}</span></h4>
      </div>
    </div>
  );
}

export default AccountDetails;
