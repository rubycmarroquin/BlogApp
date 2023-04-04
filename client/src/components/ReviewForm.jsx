import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

const ReviewForm = ({ onSaveReview, editingReview, onUpdateReview }) => {
  // This is the original State with no initial blog content
  const [gameReview, setGameReview] = useState(
    editingReview || {
      game_name: "",
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
    const username = event.target.checked;
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
  const postReview = (newReview) => {
    return fetch("http://localhost:8080/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //console.log("From the post ", data);
        //I'm sending data to the List of Students (the parent) for updating the list
        onSaveReview(data);
        //this line just for cleaning the form
        clearForm();
      });
  };

  //A function to handle the post request
  const putReview = (toEditReview) => {
    return fetch(`http://localhost:8080/api/students/${toEditReview.id}`, {
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

  //A function to handle the submit in both cases - Post and Put request!
  const handleSubmit = (e) => {
    e.preventDefault();
    if (gameReview.post_id) {
      putStudent(gameReview);
    } else {
      postStudent(gameReview);
    }
  };

  return (
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
      <Form.Check
        type={"checkbox"}
        id={`isRecommended`}
        checked={gameReview.recommendation}
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
          value={gameReview.username}
          onChange={handleUsername}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label></Form.Label>
        <input
          type="text"
          id="add-post"
          placeholder="What are your thoughts?"
          required
          value={gameReview.post}
          onChange={handlePostText}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label></Form.Label>
        <input
          type="text"
          id="add-image"
          placeholder="Enter Image URL"
          required
          value={gameReview.image_url}
          onChange={handleImageURL}
        />
      </Form.Group>
      <Form.Group>
        <Button type="submit" variant="outline-success">
          {gameReview.id ? "Edit Post" : "Create Post"}
        </Button>
        {gameReview.id ? (
          <Button type="button" variant="outline-warning" onClick={clearForm}>
            Cancel
          </Button>
        ) : null}
      </Form.Group>
    </Form>
  );
};

export default ReviewForm;