import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/Home.css"

function Home() {

    return (
        <div className="flex flex-column background">
            <div className="d-flex button-box m-auto">
                <a href="/signin" className="btn btn-light">SIGN IN</a>
                <a href="mailto:example@gmail.com" className="btn btn-light">Contact Us</a>
            </div>
            <div className="d-flex justify-content-center mt-5">
                <a className="btn btn-success" href="/faq">FAQ'S</a>
            </div>
        </div>
    )
}

export default Home
