import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../Tokens/CheckToken";
import Loading from "../Components/Loading/Loading";
import { useTransferData } from "../Contexts/TransferDataContext";
import "bootstrap/dist/css/bootstrap.min.css";

function VerifyTransfer() {
  const { transferData } = useTransferData();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [fromAccount, setFromAccount] = useState("");
  const [fromBranch, setFromBranch] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [amount, setAmount] = useState("");
  const [transferDate, setTransferDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    console.log("Transfer Data:");
    if (!transferData) {
      navigate("/account/transfer");
    }else{
        setFromAccount(transferData.fromAccount);
        setFromBranch(transferData.fromBranch);
        setToAccount(transferData.toAccount);
        setReceiverName(transferData.receivername);
        setAmount(transferData.amount);
        setTransferDate(transferData.transferDate);
        setDescription(transferData.description);
    }
  }, [navigate, transferData]);

  useEffect(() => {
    checkToken("token");
    // Retrieve JWT token from local storage
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin");
    }
  }, [navigate]);

  const handleClick = async () => {
    const token = localStorage.getItem("token");
    const formData = {
      accountNo: transferData.toAccount,
      amount: transferData.amount,
      description: transferData.description,
    };
    localStorage.removeItem("transferData");
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:3001/account/transfer/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        alert(data.message);
        navigate("/account/transfer/details");
      } else if (response.status === 400) {
        const data = await response.json();
        setMessage(data.message);
      } else if (response.status === 403) {
        alert("session expired");
      } else if (response.status === 500) {
        const data = await response.json();
        setMessage(data.message);
      }
    } catch (err) {
      console.error("Error submitting form:", err.message);
    }
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="background-full w-100 d-flex flex-column justify-content-center align-items-center">
      <div className="w-50">
        <table className="table table-striped">
          <thead>
            <tr className="table-primary">
              <th colSpan="2" className="align-middle text-center ">
                Verify
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>From Account</td>
              <td>
                {fromAccount} {fromBranch}
              </td>
            </tr>
            <tr>
              <td>To Account</td>
              <td>{toAccount}</td>
            </tr>
            <tr>
              <td>Receiver Name</td>
              <td>{receiverName}</td>
            </tr>
            <tr>
              <td>Amount</td>
              <td>LKR {amount}</td>
            </tr>
            <tr>
              <td>Transfer Date</td>
              <td>{transferDate}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{description}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="w-50 d-flex justify-content-between">
        <a href="/account/transfer" className="btn btn-danger me-5 ms-0">
          Change
        </a>
        <button onClick={handleClick} className="btn btn-success rounded-0 me-0 px-4">
          Confirm
        </button>
      </div>
    </div>
  );
}

export default VerifyTransfer;
