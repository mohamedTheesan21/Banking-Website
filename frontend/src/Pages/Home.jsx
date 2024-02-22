import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/Home.css"
import Header from '../Components/Header/Header';

function Home() {

    const handleContactUsClick = () => {
        window.location.href = 'mailto:example@gmail.com';
    };

    return (
        <div className="flex flex-column home">
            <div className="d-flex button-box m-auto">
                <a href="/signin" className="btn btn-light">Sign In</a>
                <a href="#" onClick={handleContactUsClick} className="btn btn-light">Contact Us</a>
            </div>
            <div className="d-flex justify-content-center mt-5">
                <a className="btn btn-success" href="/faq">FAQ'S</a>
            </div>
        </div>
    )
}

export default Home
