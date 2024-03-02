import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/Account.css";
// import { Link } from "react-router-dom";

function Account() {
    const balance = 1000;
    const isAuthenticated = document.cookie.includes('auth=true');
    console.log(isAuthenticated);
    return (
        <div className="background w-100 d-flex justify-content-center align-items-center">
            <div className="row m-0 account">
            <div className="col-md-6 col-sm-12 mx-auto center">
                <h2 className="text-black">Account Balance:LKR {balance}</h2>
            </div>
            <div className="col-md-6 col-sm-12 mx-auto center account-links">
                <a href="/account/details" className="btn btn-primary">Account Details</a>
                <a href="/tranfer" className="btn btn-primary ">Transfers</a>
            </div>
            </div>
        </div>
    )
}

export default Account
