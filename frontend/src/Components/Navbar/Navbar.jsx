import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css"

function Navbar() {
    return (
        <div >
            <nav className="navbar navbar-expand-lg nav-bar" style={{height: "10vh"}}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="/account">Thees Bank</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/account">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/account/transfer">Transfer</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/aboutus">About Us</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/contactus">Contact Us</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
