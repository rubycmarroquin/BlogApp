import React, { useState, useEffect } from "react";
import Login from "../components/Login";
import { Button, Form } from "react-bootstrap";

const ReviewForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState("");

  // This is the original State with no initial blog content
  const [gameReview, setGameReview] = useState({
    game_name: "",
    title: "",
    console: "",
    rating: "",
    recommendation: false,
    username: "",
    post: "",
    image_url: "",
  });

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
  const postReview = (newReview) => {
    newReview.username = user;
    return fetch("http://localhost:8080/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        clearForm();
      });
  };

  //A function to handle the submit in both cases - Post and Put request!
  const handleSubmit = (e) => {
    e.preventDefault();
    postReview(gameReview);
  };

  return (
    <>
      {showForm ? (
        <div className="CreateFormDiv">
          <h1 className="CreateFormTitle">Create Blog Post</h1>
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
                disabled
                required
                value={user || ""}
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
            <br />
            <Form.Group>
              <Button type="submit" variant="outline-success">
                Create Post
              </Button>
            </Form.Group>
          </Form>
        </div>
      ) : (
        <Login setShowForm={setShowForm} setUser={setUser} />
      )}{" "}
    </>
  );
};

export default ReviewForm;
