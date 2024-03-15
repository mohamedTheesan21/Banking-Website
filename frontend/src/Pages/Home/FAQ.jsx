import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function FAQ() {
  return (
    <div className="background-full w-100 d-flex flex-column justify-content-center align-items-center">
      <div
        className="container pt-3 pb-5 bg-light overflow-auto"
        style={{ maxHeight: "90vh" }}
      >
        <h1>FAQ</h1>
        <div className="accordion" id="faqAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button bg-dark text-light"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                What services does Thees Bank offer?
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                <strong>Thees Bank</strong> offers a range of online banking services including
                user registration, money transfers, viewing user details, and
                transfer details.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button bg-dark text-light"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                How do I register for an account?
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                To register for an account with <strong>Thees Bank</strong>, you first need to
                have a <strong>Thees Bank</strong> account. If you don't have one already, you
                can visit a branch near you to create an account. Once you have
                an account, you can then proceed to our website and follow the
                registration instructions provided.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button bg-dark text-light"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                How do I transfer money?
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                To transfer money with <strong>Thees Bank</strong>, log in to your account and
                navigate to the transfer section. Follow the instructions to
                complete the transfer process.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFour">
              <button
                className="accordion-button bg-dark text-light"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="false"
                aria-controls="collapseFour"
              >
                How can I view my transaction history?
              </button>
            </h2>
            <div
              id="collapseFour"
              className="accordion-collapse collapse"
              aria-labelledby="headingFour"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                You can view your transaction history by accessing the transfer
                details section in your account dashboard.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
