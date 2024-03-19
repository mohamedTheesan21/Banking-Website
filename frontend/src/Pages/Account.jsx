import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../Tokens/CheckToken";
import Loading from "../Components/Loading/Loading";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/Account.css";
import Navbar from "../Components/Navbar/Navbar";
import PieChart from "../Components/PieChart";

function Account() {
  const [user, setUser] = useState(null);
  const [transferDetails, setTransferDetails] = useState(null);

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
      fetch("http://localhost:3001/account/transfer/details", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          setTransferDetails(data.transferDetails.reverse());
        } else {
          navigate("/account");
        }
      });
    } else {
      navigate("/signin");
    }
  }, [navigate]);

  const handleClick = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  // Check if user is null
  if (!user) {
    return <Loading />;
  }

  const balance = user.balance || 0;

  let totalSent = 0;
  let totalReceived = 0;
  if(transferDetails){
    transferDetails.map((transfer) => {
      if(transfer.userRole === "sender"){
        totalSent += transfer.amount;
      }else {
        totalReceived += transfer.amount;
      }
    })
  }

  const data = [
    ["Role", "Amount"],
    ["Sent", totalSent],
    ["Received", totalReceived],
  ]

  return (
    <div>
      <Navbar />
      <div className="background w-100 d-flex flex-column justify-content-center align-items-center">
        <h1 className="text-white shadow-lg ">Hello, {user.name}</h1>
        <div className="row m-0 account-box">
          <div className="col-md-6 col-sm-12 mx-auto center">
            {/* <h2 className="text-black">Balance : LKR {balance}</h2> */}
            <div className="center account-links">
              <a href="/account/details" className="btn btn-primary">
                Account Details
              </a>
              <a href="/account/transfer" className="btn btn-primary ">
                Transfer
              </a>
              <a href="/account/transfer/details" className="btn btn-primary ">
                Transfer Details
              </a>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 mx-auto center">
            <PieChart data={data} />
          </div>
        </div>
        <div>
          <button className="btn btn-danger mt-5" onClick={handleClick}>
            Logout
          </button>
          <a href="/messaging"><i class="fa-brands fa-rocketchat fa-beat-fade fa-2x" style={{color:"white"}}></i></a>
        </div>
      </div>
      
    </div>
  );
}

export default Account;
