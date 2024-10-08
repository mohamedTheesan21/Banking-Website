import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function TransferSuccess(props) {
    
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Filter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label htmlFor="sort">Start Date:</label>
            <input type="date" className="form-control start-date rounded-0" onChange={props.onChange}></input>
            <label htmlFor="sort">End Date:</label>
            <input type="date" className="form-control end-date rounded-0" onChange={props.onChange}></input>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="rounded-0" onClick={props.onApply}>Filter</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TransferSuccess;
