import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/Home.css";
import PieChart from '../Components/PieChart';

function Home() {
    const data = [
        ["Task", "Hours per Day"],
        ["Work", 11],
        ["Eat", 2],
        ["Commute", 2],
        ["Watch TV", 2],
        ["Sleep", 7],
      ];
    return (
        <div className="flex flex-column background-full">
            <PieChart data={data}/>
            <div className="d-flex button-box m-auto">
                <a href="/signin" className="btn btn-light">SIGN IN</a>
                <a href="/contactus" className="btn btn-light">CONTACT US</a>
                <a href="/aboutus" className="btn btn-light">ABOUT US</a>
            </div>
            <div className="d-flex justify-content-center mt-5">
                <a className="btn btn-success" href="/faq">FAQ'S</a>
            </div>
        </div>
    )
}

export default Home
