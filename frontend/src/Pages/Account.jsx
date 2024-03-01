import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/Account.css";
import { Link } from "react-router-dom";

function Account() {
    const balance = 1000;

    return (
        <div className="row background w-100">
            <div className="col-md-6 col-sm-12 mx-auto center">
                <h2 className="text-bg-light ">Account Balance:LKR ${balance}</h2>
            </div>
            <div className="col-md-6 col-sm-12 mx-auto center">
                <Link to="/account/details" className="btn btn-primary ">Account Details</Link>
                <Link to="/tranfer" className="btn btn-primary ">Transfers</Link>
            </div>
        </div>
    )
}

export default Account
