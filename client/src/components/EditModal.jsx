/**
 * 
  //A function to handle the post request
  const putReview = (toEditReview) => {
    return fetch(`http://localhost:8080/reviews/${toEditReview.post_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toEditReview),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        onUpdateReview(data);
        //this line just for cleaning the form
        clearForm();
      });
  };
 */
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import EditingForm from './EditForm';

function EditModal({gameReview, updateReview}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="EditForm">
      <Button variant="primary" onClick={handleShow}>
        Edit Post
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Game Review</Modal.Title>
        </Modal.Header>
        <Modal.Body><EditingForm review={gameReview} updateReview={updateReview} handleClose={handleClose}/></Modal.Body>
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