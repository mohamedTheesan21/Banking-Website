import React, { useEffect, useState } from "react";
import { checkToken } from "../Tokens/CheckToken";
import { useNavigate } from "react-router-dom";
import Loading from "../Components/Loading/Loading";
import { useTransferData } from "../Contexts/TransferDataContext";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Components/Navbar/Navbar";

function Transfer() {
  const [accountNo, setAccountNo] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { transferData, setTransferData } = useTransferData();

  const navigate = useNavigate();

  useEffect(() => {
    checkToken("token");
    // Retrieve JWT token from local storage
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin");
    }
  }, [navigate]);

  useEffect(() => {
    if (transferData) {
      setAccountNo(transferData.toAccount);
      setAmount(transferData.amount);
      setDescription(transferData.description);
    }
  }, [transferData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount.match(/^\d{3,}\d*\.?\d{0,2}$/)) {
      setMessage(
        "Please enter a valid amount in numbers. your amount should have atleast 3 digits before decimal point. eg: 100.00"
      );
    } else {
      const token = localStorage.getItem("token");
      const formData = {
        accountNo: accountNo,
        amount: amount,
        description: description,
      };
      try {
        setLoading(true);
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
          setTransferData(data.transferData);
          navigate("/account/transfer/verify");
        } else {
          const data = await response.json();
          setMessage(data.message);
        }
      } catch (err) {
        console.error("Error submitting form:", err.message);
      }
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar />
      <div className="background w-100 d-flex flex-column justify-content-center align-items-center">
        <div className="box w-50">
          <form
            onSubmit={handleSubmit}
            action="post"
            className="form-elements transfer w-100"
          >
            {message && <p className="alert alert-danger">{message}</p>}
            <div className="d-flex flex-column">
              <label htmlFor="accountNo">
                <strong>Account No:</strong>
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setAccountNo(e.target.value)}
                value={accountNo}
                placeholder="Enter Account No"
                required
              />

              <label htmlFor="amount">
                <strong>Amount:</strong>
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  if (e.target.value.match(/^\d{0,3}\d*\.?\d{0,2}$/)) {
                    setAmount(e.target.value);
                  } else {
                    setMessage(
                      "Please enter a valid amount in numbers. your amount should have atleast 3 digits before decimal point. eg: 100.00"
                    );
                  }
                }}
                value={amount}
                placeholder="Enter Amount"
                required
              />

              <label htmlFor="description">
                <strong>Description:</strong>
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="Enter Description"
                maxLength={16}
                required
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
    </div>
  );
}

export default Transfer;
