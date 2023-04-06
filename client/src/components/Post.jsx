import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import * as ioicons from "react-icons/io5";
import EditModal from "./EditModal";
import { useState } from "react";
import FullPost from "./FullPost";

const Post = ({ gameReview, toUpdate, toDelete, ...props }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    // why doesn't this work?
    setShow(false);
  };

  const onDelete = (toDeleteReview) => {
    toDelete(toDeleteReview);
  };

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
