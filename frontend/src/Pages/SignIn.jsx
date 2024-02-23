import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/SignIn.css";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="row signin m-0">
      <div className="col-md-8 col-sm-12 mx-auto signin-left p-0">
        <h1>Sign In</h1>
        <form>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
          ></input>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              class="form-control"
              placeholder="Password"
            />
            {!showPassword ? (
              <i
                className="far fa-eye eye-icon"
                onClick={togglePasswordVisibility}
              ></i>
            ) : (
              <i
                class="fa-regular fa-eye-slash eye-icon"
                onClick={togglePasswordVisibility}
              ></i>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </form>
      </div>
      <div className="col-md-4 col-sm-12 mx-auto signin-right p-0">
        <h1>Are you new to online banking?</h1>
        <a href="/register" className="btn btn-primary">
          Register Now
        </a>
      </div>
    </div>
  );
}

export default SignIn;
