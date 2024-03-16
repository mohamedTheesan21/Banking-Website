import React from "react";

function ContactUs() {
  return (
    <div className="background-full w-100 d-flex flex-column justify-content-center align-items-center">
      <div
        className="container py-3 px-4 mx-0 overflow-auto"
        style={{ maxHeight: "95vh"}}
      >
        <div className="d-flex flex-column justify-content-center align-items-center">
        <h1>Contact Us</h1>
        <p>
          If you have any questions, feedback, or require assistance, please
          don't hesitate to reach out to us.
        </p>
        </div>
        <div className="row">
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h2>Contact Information</h2>
            <p>
              <strong>Email:</strong> <a href="mailto:support@theesbank.com">support@theesbank.com</a>
            </p>
            <p>
              <strong>Phone:</strong> 1-123-123-4567
            </p>
            <p>
              <strong>Address:</strong> 123 Main Street, City, State, Zip Code 123456
            </p>
          </div>
          <div className="col-md-6">
            <h2>Contact Form</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input type="text" className="form-control border-0 rounded-0" id="name" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input type="email" className="form-control border-0 rounded-0" id="email" />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  className="form-control border-0 rounded-0"
                  id="message"
                  rows="4"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary rounded-0 ">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
