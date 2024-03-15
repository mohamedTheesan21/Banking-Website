import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./AboutUs.css";

function AboutUs() {
    return (
        <div className="background-full w-100 d-flex flex-column justify-content-center align-items-center">
        <div className="container bg-light overflow-auto" style={{maxHeight: "90vh"}}>
            <h2>About Thees Bank</h2>
            <p>Welcome to Thees Bank, your trusted partner in modern online banking services.</p>

            <h3>What We Offer</h3>
            <ul>
                <li><strong>User Registration:</strong> Easily register for an account with Thees Bank and start managing your finances online.</li>
                <li><strong>Money Transfer:</strong> Transfer money between accounts quickly and securely, whether it's paying bills, sending funds to friends and family, or managing business transactions.</li>
                <li><strong>User Details:</strong> Access and update your personal and account information with ease. We prioritize the security and privacy of your data, ensuring that your information remains confidential and protected at all times.</li>
                <li><strong>Transfer Details:</strong> Keep track of your transaction history with detailed transfer details. Review past transfers, monitor account balances, and stay informed about your financial activities.</li>
            </ul>

            <h3>Our Commitment</h3>
            <p>At Thees Bank, we prioritize customer satisfaction and strive to exceed your expectations at every step. Our team of dedicated professionals is here to assist you with any inquiries or concerns you may have. We are committed to innovation, continuous improvement, and delivering excellence in online banking services.</p>

            {/* <h3>Contact Us</h3>
            <p>If you have any questions, feedback, or require assistance, please don't hesitate to reach out to us. Our customer support team is available 24/7 to assist you.</p>
            <ul>
                <li><strong>Phone:</strong> 1-800-THEES-BANK</li>
                <li><strong>Email:</strong> support@theesbank.com</li>
                <li><strong>Address:</strong> 123 Main Street, City, State, Zip Code</li>
            </ul> */}

            <p>Thank you for choosing Thees Bank for your banking needs. We look forward to serving you!</p>
        </div>
        </div>
    );
}

export default AboutUs;
