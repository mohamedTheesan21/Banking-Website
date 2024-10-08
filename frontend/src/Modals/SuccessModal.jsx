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
        onHide={null} // Disable closing the modal when clicking outside or pressing the escape key
        backdrop="static" // Prevent modal from closing when clicking outside
      >
        <Modal.Header style={{ border: "none" }} closeButton={false}>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ borderTop: "none" }}>
          <p>
            {props.success}
          </p>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: "none" }}>
          <Button onClick={props.onHide} style={{ borderRadius: 0 }}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TransferSuccess;
