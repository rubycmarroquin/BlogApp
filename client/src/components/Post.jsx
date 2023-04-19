import React from "react";
import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import EditModal from "./EditModal";
import FullPost from "./FullPost";
import * as ioicons from "react-icons/io5";

const Post = ({ gameReview, toUpdate, toDelete, ...props }) => {
  // handles the modal for full post test
  const [show, setShow] = useState(false);

  // handles showing admin buttons
  const [adminPrivs, setAdminPrivs] = useState(false);

  // shows modal
  const handleShow = () => {
    setShow(true);
  };

  // hides modal
  const handleClose = () => {
    setShow(false);
  };

  // deletes review
  const onDelete = (toDeleteReview) => {
    const response = window.prompt("Are you sure? (yes/no)");
    response.toLowerCase() === "yes" ? toDelete(toDeleteReview) : false;
  };

  const handleButtonsShown = () => {
    const adminPass = window.prompt("Enter Admin Password");
    if (adminPass === "Testing") {
      setAdminPrivs(true);
    } else {
      alert("Wrong password");
    }
  };

  const recommended = (recommend) => {
    return recommend ? (
      <ioicons.IoHappy style={{ fontSize: "25px", color: "green" }} />
    ) : (
      <ioicons.IoSad style={{ fontSize: "25px", color: "red" }} />
    );
  };

  return (
    <div style={{ color: "white" }} className="BlogCards">
      <Card.Body className="CardBody">
        <Card.Title
          className="CardTitle"
          style={{ paddingTop: "13px", fontSize: "25px" }}
        >
          {gameReview.title}
        </Card.Title>
        <Card.Body>Game: {gameReview.game_name}</Card.Body>
        <Card.Body>Rating: {buildStars(gameReview.rating)}</Card.Body>
        <img
          onClick={handleShow}
          role="button"
          style={{ height: "45%", width: "85%", marginTop: "10px" }}
          src={gameReview.image_url}
          alt="Game Image"
        />
        <Card.Body style={{ fontSize: "small", marginTop: "5px" }}>
          <em>Posted by: {gameReview.username}</em>
        </Card.Body>
        {adminPrivs ? (
          <div className="CardButtons" style={{ marginTop: "-15px" }}>
            <Button
              style={{ marginRight: "5px" }}
              variant="outline-danger"
              onClick={() => {
                onDelete(gameReview);
              }}
            >
              <ioicons.IoTrash />
            </Button>
            <EditModal
              gameReview={gameReview}
              updateReview={props.updateReview}
            />
          </div>
        ) : (
          <div style={{ marginTop: "-10px" }}>
            <Button size="sm" onClick={handleButtonsShown}>
              Admin?
            </Button>
          </div>
        )}
        <Card.Body style={{ marginTop: "10px" }}>
          Recommended: {recommended(gameReview.recommendation)}
        </Card.Body>
      </Card.Body>
      {show ? (
        <FullPost
          title={gameReview.title}
          post={gameReview.post}
          show={show}
          handleClose={handleClose}
        />
      ) : null}
    </div>
  );
};

export default Post;

/*********** Other functions ***********/
const buildStars = (rating) => {
  const yellowStars = parseInt(rating);
  const grayStars = 5 - yellowStars;
  let stars = [];
  for (let i = 0; i < yellowStars; i++) {
    stars.push(
      <ioicons.IoStar
        key={`${i}+star`}
        style={{ fontSize: "20px", color: "yellow" }}
      />
    );
  }
  for (let j = 0; j < grayStars; j++) {
    stars.push(
      <ioicons.IoStar
        key={`${j}`}
        style={{ fontSize: "20px", color: "gray" }}
      />
    );
  }
  return stars;
};
