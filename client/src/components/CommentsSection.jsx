import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import RepliesSection from "./ListReplies";

const CommentsSection = () => {
  const [thread, setThread] = useState({
    title: "",
  });

  const handleTitle = (e) => {
    const title = e.target.value;
    setThread((thread) => ({ ...thread, title }));
  };

  const clearForm = () => {
    setThread("");
  };

  const [allThreads, setAllThreads] = useState([]);

  const loadThreads = () => {
    // A function to fetch the list of reviews that will be load anytime that list change
    fetch("http://localhost:8080/threads")
      .then((response) => response.json())
      .then((reviews) => {
        setAllThreads(reviews);
      });
  };

  useEffect(() => {
    loadThreads();
  }, []);

  async function createThread() {
    await fetch("http://localhost:8080/threads", {
      method: "POST",
      body: JSON.stringify(thread),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        loadThreads();
      })
      .catch((err) => console.error(err));
  }

  //Triggered when the form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();
    createThread();
    clearForm();
  };

  return (
    <>
      <main className="home">
        <Form className="ThreadWHoleForm" onSubmit={handleSubmit}>
          <h2 style={{ paddingTop: "20px" }} className="homeTitle">
            Create a Thread
          </h2>
          <div className="ThreadFormSec">
            <label htmlFor="thread">Title / Discussion </label>
            <input
              type="text"
              name="thread"
              placeholder="Enter thread topic"
              required
              value={thread.title || ""}
              onChange={handleTitle}
            />
          </div>
          <Button
            style={{ marginBottom: "25px" }}
            type="submit"
            className="homeBtn"
          >
            Create Thread
          </Button>
        </Form>
        <div style={{ marginTop: "25x" }} className="thread__container">
          {allThreads.map((thread, index) => (
            <RepliesSection thread={thread} key={`${index}` + thread} />
          ))}
        </div>
      </main>
    </>
  );
};

export default CommentsSection;
