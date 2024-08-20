import React, { useEffect, useState } from "react";
import { checkToken } from "../Tokens/CheckToken";
import { useNavigate } from "react-router-dom";
import Loading from "../Components/Loading/Loading";
import { useTransferData } from "../Contexts/TransferDataContext";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Components/Navbar/Navbar";
import BeneficiaryModal from "../Modals/BeneficiaryModal";

function Transfer() {
  const [accountNo, setAccountNo] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [transfer, setTransfer] = useState(false);
  const [beneficiaries, setBeneficiaries] = useState([]);

  const [modalShow, setModalShow] = useState(false);

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

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3001/account/beneficiary/details", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      if (response.status === 200) {
        const data = await response.json();
        setBeneficiaries(data.beneficiaries);
      } else {
        console.log("Error fetching data");
      }
    });
  }, [navigate]);

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

  if (modalShow) {
    const beneficiary = beneficiaries.find(
      (beneficiary) => beneficiary.accountID === accountNo
    );
    const name = beneficiary ? beneficiary.name : "";

    console.log(name);
    return (
      <BeneficiaryModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        title="Beneficiary Information"
        name={name}
        accountid={accountNo}
      />
    );
  }

  return (
    <div>
      <Navbar />
      <div className="background w-100 d-flex flex-column justify-content-center align-items-center">
        {transfer ? (
          <div className="box w-50">
            <form
              onSubmit={handleSubmit}
              action="post"
              className="form-elements transfer w-100"
            >
              {message && <p className="alert alert-danger">{message}</p>}
              <div className="d-flex flex-column">
                <label htmlFor="beneficiary">
                  <strong>Beneficiary:</strong>
                </label>
                <select
                  value={accountNo}
                  onChange={(e) => setAccountNo(e.target.value)}
                  className="form-select rounded-0"
                  aria-label="Default select example"
                  style={{ paddingBottom: "10px", paddingTop: "10px" }}
                >
                  <option value="">Select Beneficiary</option>
                  {beneficiaries.map((beneficiary) => {
                    return (
                      <option
                        key={beneficiary._id}
                        value={beneficiary.accountID}
                      >
                        {beneficiary.name}
                      </option>
                    );
                  })}
                </select>

                {accountNo && (
                  <button
                    onClick={() => setModalShow(true)}
                    style={{ width: "20%", marginTop: "5px" }}
                  >
                    veiw details
                  </button>
                )}
                <label htmlFor="amount">
                  <strong>Amount:</strong>
                </label>
                <input
                  type="text"
                  className="form-control mt-0 mb-2"
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
                  className="form-control mt-0"
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
        ) : (
          <div className="account-box w-50 d-flex flex-column justify-content-center align-items-center ">
            <a
              href="/account/beneficiary"
              className="btn btn-light rounded-0 w-50"
            >
              + Add Beneficiary
            </a>
            <button
              onClick={() => setTransfer(true)}
              className="btn btn-light rounded-0 w-50 mt-3"
            >
              Transfer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Transfer;
