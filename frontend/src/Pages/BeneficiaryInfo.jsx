import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { checkToken } from "../Tokens/CheckToken";
import Loading from "../Components/Loading/Loading";
import SuccessModal from "../Modals/SuccessModal";

function BeneficiaryInfo() {
  const [name, setName] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [suceess, setSuccess] = useState(false);
  const [receiverName, setReceiverName] = useState("");
  const navigate = useNavigate();

  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    checkToken("token");
    // Retrieve JWT token from local storage
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      accountNo,
      email,
    };
    console.log(formData);
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3001/account/beneficiary",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        setReceiverName(data.name);
        setSuccess(true);
        console.log(data);
        // navigate("/account");
      } else if (response.status === 400) {
        const data = await response.json();
        setError(data.message);
      } else if (response.status === 500) {
        const data = await response.json();
        setError(data.message);
      } else if (response.status === 403) {
        navigate("/signin");
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
    setLoading(false);
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3001/account/beneficiary/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ name, accountNo, email }),
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        setModalShow(true);
      } else if (response.status === 400) {
        const data = await response.json();
        setError(data.message);
      } else if (response.status === 500) {
        const data = await response.json();
        setError(data.message);
      } else if (response.status === 403) {
        navigate("/signin");
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  if (modalShow) {
    return (
      <SuccessModal
        title="Beneficiary"
        success="Beneficiary added successfully! Please continue to transfer."
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          navigate("/account");
        }}
      />
    );
  }

  return (
    <div className="background-full w-100 d-flex flex-column justify-content-center align-items-center">
      {suceess ? (
        <div className="col-sm-12 col-md-8 col-lg-6">
          <div className="w-100">
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
                  <td>Beneficiary Name</td>
                  <td>{name}</td>
                </tr>
                <tr>
                  <td>Beneficiary Name as per Bank</td>
                  <td>{receiverName}</td>
                </tr>
                <tr>
                  <td>Beneficiary Account No.</td>
                  <td>{accountNo}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-100 d-flex justify-content-between">
            <a href="/account/beneficiary" className="btn btn-danger me-5 ms-0">
              Change
            </a>
            <button
              onClick={handleClick}
              className="btn btn-success rounded-0 me-0 px-4"
            >
              Confirm
            </button>
          </div>
        </div>
      ) : (
        <div className="account-box px-5 w-50 d-flex flex-column justify-content-center ">
          <h1>Beneficiary Information</h1>
          {error && <p className="alert alert-danger">{error}</p>}
          <form
            onSubmit={handleSubmit}
            className="form-elements mt-0"
            style={{ width: "100%" }}
          >
            <input
              type="text"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Beneficiary Name"
              required
            />
            <input
              type="text"
              className="form-control"
              onChange={(e) => setAccountNo(e.target.value)}
              placeholder="Enter Account No"
              required
            />
            <input
              type="text"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email(Optional)"
            />

            <div className="row">
              <div className="col-md-6 d-flex justify-content-center">
                <a
                  href="/"
                  className="btn btn-light"
                  style={{ border: "2px solid #000" }}
                >
                  Cancel
                </a>
              </div>
              <div className="col-md-6 d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-light"
                  style={{ border: "2px solid #000" }}
                >
                  Continue
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default BeneficiaryInfo;
