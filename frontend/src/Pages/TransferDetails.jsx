import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../Tokens/CheckToken";
import Loading from "../Components/Loading/Loading";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Components/Navbar/Navbar";
import SortByDate from "../Models/SortByDate";

function TransferDetails() {
  const [transferDetails, setTransferDetails] = useState(null);
  const [filteredTransfers, setFilteredTransfers] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [modalShow, setModalShow] = useState(false);

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
          setFilteredTransfers(data.transferDetails);
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

  const handleClick = () => {
    setModalShow(true);
  };

  const handleFilter = () => {
    setFilteredTransfers(transferDetails.filter((transfer) => {
      const transferDate = new Date(transfer.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      
      return (!start || transferDate >= start) && (!end || transferDate <= end);
    }));
  }
  

  return (
    <div>
      <Navbar />
      <div className="background w-100 d-flex flex-column justify-content-center align-items-center">
        <div className="d-flex flex-row justify-content-between w-75">
          <h1 style={{ color: "white" }}>Transfer Details</h1>
          <button className="btn btn-light px-4 py-0 my-2 rounded-0" onClick={handleClick}>
            Filter by Date
          </button>
          {modalShow ? (
            <SortByDate
              show={modalShow}
              onHide={() => {
                console.log("onHide");
                setModalShow(false);
              }}
              onApply={() => {
                handleFilter();
                setModalShow(false);
              }}
              onChange={(e) => {
                if (e.target.className === "form-control start-date rounded-0") {
                  setStartDate(e.target.value);
                } else {
                  setEndDate(e.target.value);
                }
              }}
            />
          ) : (
            <></>
          )}
        </div>

        <div className="w-75 mh-50 overflow-auto" style={{ maxHeight: "70vh" }}>
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
            {filteredTransfers.map((transfer, index) => {
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
