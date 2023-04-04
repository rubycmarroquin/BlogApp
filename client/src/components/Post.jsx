import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import * as ioicons from "react-icons/io5";

const Post = ({ gameReview, toUpdate, toDelete }) => {
  const onUpdate = (toUpdateReview) => {
    toUpdate(toUpdateReview);
  };

  const onDelete = (toDeleteReview) => {
    toDelete(toDeleteReview);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {gameReview.title}
        </Card.Title>
        <Card.Body>Game Title: {gameReview.game_name}</Card.Body>
        <Card.Body>Rating: {gameReview.rating}/5</Card.Body>
        <Card.Body>Recommended: {gameReview.recommendation}</Card.Body>
        <Card.Body>{gameReview.post}</Card.Body>
        <img style={{height: '25%', width: '50%'}}src={gameReview.image_url} alt="Game Image"/>
        <Card.Body>Post by: {gameReview.username}</Card.Body>
        <Button
          variant="outline-danger"
          onClick={() => {
            onDelete(gameReview);
          }}
          style={{ padding: "0.6em", marginRight: "0.9em" }}
        >
          <ioicons.IoTrash />
        </Button>
        <Button
          variant="outline-info"
          onClick={() => {
            onUpdate(gameReview);
          }}
          style={{ padding: "0.6em" }}
        >
          <ioicons.IoSync />
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Post;
