import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function TransferSuccess(props) {
  return (
    <div className="background-full">
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Transfer successful
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <h3>Transfer successful</h3> */}
          <p>
            Your transfer was successful. You will receive a confirmation email.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TransferSuccess;
