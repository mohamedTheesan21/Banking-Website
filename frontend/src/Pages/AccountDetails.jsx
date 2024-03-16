import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../Tokens/CheckToken";
import Loading from "../Components/Loading/Loading";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Components/Navbar/Navbar";

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
  }, [navigate]);
  if (!user) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar />
      <div className="background w-100 d-flex flex-column justify-content-center align-items-center">
        <div className="w-50">
          <table className="table table-striped">
            <thead>
              <tr className="table-primary">
                <th colSpan="2" className="align-middle text-center ">
                  Account Details
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Account No:</td>
                <td>{user.accountID}</td>
              </tr>
              <tr>
                <td>Branch:</td>
                <td>{user.branch}</td>
              </tr>
              <tr>
                <td>Account Holder Name:</td>
                <td>{user.name}</td>
              </tr>
              <tr>
                <td>Total Available Balance:</td>
                <td>LKR {user.balance}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AccountDetails;
