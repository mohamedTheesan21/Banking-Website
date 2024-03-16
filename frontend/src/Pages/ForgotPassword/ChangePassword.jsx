import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from "../../Components/Loading/Loading";
import { checkToken } from "../../Tokens/CheckToken";
import ResetPasswordModal from "../../Models/ResetPasswordModal";

function ChangePassword() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Password and confirm password didn't match");
    } else {
      const formData = {
        password,
      };
      checkToken("userToken");
      const token = localStorage.getItem("userToken");
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:3001/user/forgot%20password/reset%20password",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setModalShow(true);
        } else if (response.status === 404) {
          console.log("User does not exist");
          setError(
            "User does not match with our records. Please try again. if you don't have an account, please go to the nearest branch to open an account. Thank you."
          );
        } else {
          throw new Error("Failed to submit form");
        }
      } catch (err) {
        console.error("Error submitting form:", err.message);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    checkToken("userToken");
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/forgot password");
    }
  }, [navigate]);

  if (loading) {
    return <Loading />;
  }

  if (modalShow) {
    console.log("Theesan")
    return (
      <ResetPasswordModal show={modalShow} onHide={() => {
        setModalShow(false);
        navigate("/signin");
      }} />
    );
  }

  return (
    <div className="background-full d-flex flex-column justify-content-center align-items-center ">
      <div className="account-box px-5 w-50 d-flex flex-column justify-content-center ">
        <form
          onSubmit={handleSubmit}
          action="post"
          className="form-elements"
          style={{ width: "90%" }}
        >
          {error && <p className="alert alert-danger mb-0">{error}</p>}
          <input
            type="password"
            className="form-control"
            placeholder="Enter New Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            className="form-control"
            placeholder="Confirm New Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div className="row">
            <div className="col-md-6 d-flex justify-content-center">
              <a href="/signin" className="btn btn-light">
                Cancel
              </a>
            </div>
            <div className="col-md-6 d-flex justify-content-center">
              <button type="submit">Continue</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
