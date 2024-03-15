import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../Tokens/CheckToken";
import Loading from "../Components/Loading/Loading";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Components/Navbar/Navbar";

function TransferDetails() {
  const [transferDetails, setTransferDetails] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    checkToken("token");
    // Retrieve JWT token from local storage
    const token = localStorage.getItem("token");

    if (token) {
      // Send request to backend with token in the Authorization header
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

  if (!transferDetails) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar />
      <div className="background w-100 d-flex flex-column justify-content-center align-items-center">
        <h1 style={{ color: "white" }}>Transfer Details</h1>
        <div className="w-75 mh-50 overflow-auto" style={{ maxHeight: "80vh" }}>
          <table className="table table-striped">
            <thead>
              <tr className="table-primary ">
                <th className="align-middle">Date</th>
                <th className="align-middle">
                  Time
                  <br />
                  (HH.MM.SS)
                </th>
                <th className="align-middle">Description</th>
                <th className="align-middle">
                  Amount
                  <br />
                  (Credit/<span style={{ color: "red" }}>Debit</span>)
                </th>
                <th className="align-middle">Balance</th>
              </tr>
            </thead>
            {transferDetails.map((transfer, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td>{transfer.date}</td>
                    <td>{transfer.time}</td>
                    <td>{transfer.description}</td>
                    <td
                      style={{
                        color:
                          transfer.userRole === "receiver" ? "black" : "red",
                      }}
                    >
                      {transfer.amount}
                    </td>
                    <td>
                      {transfer.userRole === "receiver"
                        ? transfer.receiverBalance
                        : transfer.senderBalance}
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}

export default TransferDetails;
