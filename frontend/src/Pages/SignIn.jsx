import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/SignIn.css";

function SignIn() {
  return (
    // <div className="signin">
    //   <div className="user-details">
    //     <form className="box">
    //       <input
    //         type="text"
    //         className="form-control"
    //         placeholder="Username"
    //       ></input>
    //       <input
    //         type="password"
    //         className="form-control"
    //         placeholder="Password"
    //       ></input>
    //       <div className="forgot-password">
    //         <a href="#">Forgot Password</a>
    //       </div>
    //       <button type="submit" className="btn btn-primary">
    //         Sign In
    //       </button>
    //     </form>
    //   </div>
    //   <div className="new-user-register">
    //     <p>Are you new to online banking</p>
    //     <a className="me-0" href="/register">
    //       Register Now
    //     </a>
    //   </div>
    // </div>
    <div className="row signin m-0">
      <div className="col-md-8 col-sm-12 mx-auto signin-left p-0">
        <h1>Sign In</h1>
        <form>
            <input type="text" className="form-control" placeholder="Username"></input>
            <input type="password" className="form-control" placeholder="Password"></input>
            <button type="submit" className="btn btn-primary">Sign In</button>
        </form>
      </div>
      <div className="col-md-4 col-sm-12 mx-auto signin-right p-0">
        <h1>Are you new to online banking</h1>
        <a href="/register" className="btn btn-primary">Register Now</a>
      </div>
    </div>
  );
}

export default SignIn;
