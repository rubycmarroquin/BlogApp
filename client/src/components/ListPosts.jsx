import React, { useState, useEffect } from "react";
import Post from "./Post";
import ReviewForm from "./ReviewForm";

const ListReviews = () => {
  // this is my original state with an array of game reviews
  const [gameReviews, setGameReviews] = useState([]);

  //this is the state needed for the UpdateRequest
  const [editingReview, setEditingReview] = useState(null);

  const loadGameReviews = () => {
    // A function to fetch the list of reviews that will be load anytime that list change
    fetch("http://localhost:8080/reviews")
      .then((response) => response.json())
      .then((reviews) => {
        setGameReviews(reviews);
      });
  };

  useEffect(() => {
    loadGameReviews();
  }, []);

  const onSaveReview = (newReview) => {
    setGameReviews((gameReviews) => [...gameReviews, newReview]);
  };

  //A call back function passed to Posts to call loadGameReviews() after updating review
  const updateReview = (savedReview) => {
    loadGameReviews();
  };

  //A function to handle the Delete funtionality
  const onDelete = (gameReview) => {
    return fetch(`http://localhost:8080/api/students/${gameReview.post_id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        loadGameReviews();
      }
    });
  };

  //A function to handle the Update functionality
  const onUpdate = (toUpdateReview) => {
    setEditingReview(toUpdateReview);
  };

  return (
    <div className="mybody">
      <div className="list-students">
        <h2>Techtonica Participants </h2>
        <ul>
          {gameReviews.map((review) => {
            return (
              <li key={review.post_id}>
                <Post
                  gameReview={review}
                  toDelete={onDelete}
                  toUpdate={onUpdate}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <ReviewForm
        key={editingReview ? editingReview.post_id : null}
        onSaveReview={onSaveReview}
        editingReview={editingReview}
        onUpdateReview={updateReview}
      />
    </div>
  );
};

export default ListReviews;
