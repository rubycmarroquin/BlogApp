import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const UserReply = ({ threadId, refresh }) => {
  const [reply, setReply] = useState({
    comment_id: "",
    thread_id: threadId,
    username: "",
  });

  const clearForm = () => {
    setReply({
      comment_id: "",
      thread_id: threadId,
      username: "",
    });
  };

  const handleUserName = (e) => {
    const username = e.target.value;
    setReply((reply) => ({ ...reply, username }));
  };

  const handleComment = (e) => {
    const comment_text = e.target.value;
    setReply((reply) => ({ ...reply, comment_text }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postReply(reply);
    refresh();
  };

  //A function to handle the post request to comments table in db
  const postReply = async (newReply) => {
    return fetch("http://localhost:8080/replies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReply),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        clearForm();
      });
  };

  return (
    <Form className="ReplyFormOutter" onSubmit={handleSubmit}>
      <h2>Reply to Thread</h2>
      <Form.Group>
        <input
          type="text"
          name="comment"
          placeholder="Reply to thread"
          required
          value={reply.comment_text || ""}
          onChange={handleComment}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="thread">Username</Form.Label>
        <input
          type="text"
          name="usernameReply"
          placeholder="Enter username"
          required
          value={reply.username || ""}
          onChange={handleUserName}
        />
      </Form.Group>
      <Button
        style={{ marginBottom: "25px" }}
        type="submit"
        className="homeBtn"
      >
        Post Comment
      </Button>
    </Form>
  );
};

export default UserReply;
