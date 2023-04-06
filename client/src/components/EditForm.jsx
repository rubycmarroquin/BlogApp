import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

const EditingForm = ( { review, updateReview, handleClose} ) => {
  // This is the original State with no initial blog content
  const [gameReview, setGameReview] = useState(
    review || {
      game_name:"",
      title: "",
      console: "",
      rating: "",
      recommendation: false,
      username: "",
      post: "",
      image_url: "",
    }
  );

  //create functions that handle the event of the user typing into the form
  const handleGameName = (event) => {
    const game_name = event.target.value;
    setGameReview((gameReview) => ({ ...gameReview, game_name }));
  };

  const handleTitle = (event) => {
    const title = event.target.value;
    setGameReview((gameReview) => ({ ...gameReview, title }));
  };

  const handleConsole = (event) => {
    const console = event.target.value;
    setGameReview((gameReview) => ({ ...gameReview, console }));
  };
  const handleRating = (event) => {
    const rating = event.target.value;
    setGameReview((gameReview) => ({ ...gameReview, rating }));
  };
  const handleRecommendation = (event) => {
    const recommendation = event.target.checked;
    setGameReview((gameReview) => ({ ...gameReview, recommendation }));
  };
  
  const handleUsername = (event) => {
    const username = event.target.value;
    setGameReview((gameReview) => ({ ...gameReview, username }));
  };

  const handlePostText = (event) => {
    const post = event.target.value;
    setGameReview((gameReview) => ({ ...gameReview, post }));
  };

  const handleImageURL = (event) => {
    const image_url = event.target.value;
    setGameReview((gameReview) => ({ ...gameReview, image_url }));
  };

  const clearForm = () => {
    setGameReview({
      game_name: "",
      title: "",
      console: "",
      rating: "",
      recommendation: false,
      username: "",
      post: "",
      image_url: "",
    });
  };

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
        updateReview(data);
        //this line just for cleaning the form
        clearForm();
      });
  };

  //A function to handle the submit in both cases - Post and Put request!
  const handleSubmit = (e) => {
    e.preventDefault();
    putReview(gameReview);
    handleClose();

  };

  return (
    <>
    <Form className="form-students" onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Game Title: </Form.Label>
        <input
          type="text"
          id="add-game-name"
          placeholder="Game Title"
          required
          value={gameReview.game_name || ""}
          onChange={handleGameName}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Title: </Form.Label>
        <input
          type="text"
          id="add-tile"
          placeholder="Post Title"
          required
          value={gameReview.title || ""}
          onChange={handleTitle}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Console</Form.Label>
        <input
          type="text"
          id="add-console"
          placeholder="Console / Device Played"
          required
          value={gameReview.console || ""}
          onChange={handleConsole}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Rating: </Form.Label>
        <input
          type="text"
          id="add-rating"
          placeholder="Rating (out of 5)"
          required
          value={gameReview.rating || ""}
          onChange={handleRating}
        />
      </Form.Group>
      <Form.Check
        type={"checkbox"}
        id={`isRecommended`}
        checked={gameReview.recommendation || false}
        onChange={handleRecommendation}
        label={`Do you recommend this game?`}
      />
      <Form.Group>
        <Form.Label>Username: </Form.Label>
        <input
          type="text"
          id="add-username"
          placeholder="Username"
          required
          value={gameReview.username || ""}
          onChange={handleUsername}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Blog Post: </Form.Label>
        <input
          type="text"
          id="add-post"
          placeholder="What are your thoughts?"
          required
          value={gameReview.post || ""}
          onChange={handlePostText}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Image URL:</Form.Label>
        <input
          type="text"
          id="add-image"
          placeholder="Enter Image URL"
          required
          value={gameReview.image_url || ""}
          onChange={handleImageURL}
        />
      </Form.Group>
        <br/><Button type="submit" variant="outline-success">
          Edit Post
        </Button>
    </Form>
    </>
  );
};

export default EditingForm;
