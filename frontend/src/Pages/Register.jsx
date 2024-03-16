import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/Register.css"

function Register() {
    return (
        <div className="background d-flex flex-column justify-content-center align-items-center ">
            <form action="post" className="form-elements">
                <input type="text" className="form-control" placeholder="Enter Account Number" required />
                <input type="text" className="form-control" placeholder="Enter Phone Number" required/>
                <input type="text" className="form-control" placeholder="Enter Email Address" required/>
                <div className="row">
                    <div className="col-md-6 d-flex justify-content-center">
                        <a href="/signin" className="btn btn-light">Cancel</a>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center">
                        <button className="btn btn-light">Continue</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register
