import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import EditingForm from "./EditForm";

function EditModal({ gameReview, updateReview }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="EditForm">
      <Button bsPrefix="btn" variant="primary" onClick={handleShow}>
        Edit Post
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Game Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditingForm
            review={gameReview}
            updateReview={updateReview}
            handleClose={handleClose}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditModal;
