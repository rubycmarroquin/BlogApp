import React, { useState, useEffect } from "react";
import Post from "../components/Post";

const ListReviews = () => {
  // this is my original state with an array of game reviews
  const [gameReviews, setGameReviews] = useState([]);

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

  // Used after a new review has been added 
  const onSaveReview = (newReview) => {
    setGameReviews((gameReviews) => [...gameReviews, newReview]);
  };

  //A call back function passed to Posts to call loadGameReviews() after updating review
  const updateReview = (savedReview) => {
    loadGameReviews();
  };

  //A function to handle the Delete funtionality
  const onDelete = (gameReview) => {
    return fetch(`http://localhost:8080/reviews/${gameReview.post_id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        loadGameReviews();
      }
    });
  };

  return (
    <>
    <div className="mybody">
      <div className="list-students">
        <h1 className="LatestPosts">Latest Posts</h1>
        <div className="BlogPostCardsDiv">
          {gameReviews.map((review) => {
            return (
              <div className="BlogPostCards" key={review.post_id}>
                <Post
                  gameReview={review}
                  toDelete={onDelete}
                  updateReview={updateReview}
                />
              </div>
            );
          })}
          </div>
      </div>
    </div>
    </>
  );
};

export default ListReviews;
