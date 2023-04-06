import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function FullPost({ title, post, show, handleClose }) {
  const handleClick = () => handleClose();

  return (
    <>
      <Modal show={show} onHide={handleClick}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{post}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClick}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FullPost;
