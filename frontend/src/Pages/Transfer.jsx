import React, { useEffect, useState } from "react";
import { checkToken } from "../Tokens/CheckToken";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/Transfer.css";

function Transfer() {
  const [accountNo, setAccountNo] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    checkToken("token");
    // Retrieve JWT token from local storage
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin");
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = {
      accountNo: accountNo,
      amount: amount,
      description: description,
    };
      try {
        const response = await fetch("http://localhost:3001/account/transfer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
        if (response.status === 200) {
          const data = await response.json();
          console.log("Transfer successful", data);
        } else if (response.status === 400) {
          const data = await response.json();
          console.log(data.message);
        } else if (response.status === 403) {
          alert("session expired");
        }
      } catch (err) {
        console.error("Error submitting form:", err.message);
      }
  };

  return (
    <div className="background w-100 d-flex flex-column justify-content-center align-items-center">
      <div className="box w-50">
        <form onSubmit={handleSubmit} action="post" className="form-elements">
          <div className="d-flex flex-column">
            <h5 className="mb-0">Account No</h5>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setAccountNo(e.target.value)}
              placeholder="Enter Account No"
            />
          </div>
          <div className="mt-3 d-flex flex-column">
            <h5 className="mb-0">Transfer</h5>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Amount"
            />
            <input
              type="text"
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
              maxLength={16}
            />
          </div>
          <div>
            <button type="submit" className="btn btn-success">
              Transfer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Transfer;
