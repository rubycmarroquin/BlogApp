const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const db = require("./db/db-connection.js");

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route "/""
app.get("/", (req, res) => {
  res.json({ message: "This is from My template ExpressJS with React-Vite" });
});

// get request to games table 
app.get("/reviews", async (req, res) => {
  try {
    const { rows: reviews } = await db.query("SELECT * FROM games");
    res.send(reviews);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// create the POST request
app.post("/reviews", async (req, res) => {
  try {
    const newReview = {
      game_name: req.body.game_name,
      title: req.body.title,
      console: req.body.console,
      rating: req.body.rating,
      recommendation: req.body.recommendation,
      username: req.body.username,
      post: req.body.post,
      image_url: req.body.image_url,
    };
    const result = await db.query(
      `insert into games(post_id, game_name, title, console, rating, recommendation, username, post, image_url) values(nextval('id_seq'), $1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        newReview.game_name,
        newReview.title,
        newReview.console,
        newReview.rating,
        newReview.recommendation,
        newReview.username,
        newReview.post,
        newReview.image_url,
      ]
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

// delete request 
app.delete("/reviews/:postId", async (req, res) => {
  try {
    const post_id = req.params.postId;
    await db.query("DELETE FROM games WHERE post_id=$1", [post_id]);
    console.log("From the delete request-url", post_id);
    res.status(200).end();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

//A put request - Update a student
app.put("/api/students/:studentId", async (req, res) => {
  //console.log(req.params);
  //This will be the id that I want to find in the DB - the student to be updated
  const studentId = req.params.studentId;
  const updatedStudent = {
    id: req.body.id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    iscurrent: req.body.is_current,
  };
  console.log("In the server from the url - the student id", studentId);
  console.log(
    "In the server, from the react - the student to be edited",
    updatedStudent
  );
  // UPDATE students SET lastname = "something" WHERE id="16";
  const query = `UPDATE students SET firstname=$1, lastname=$2, is_current=$3 WHERE id=${studentId} RETURNING *`;
  const values = [
    updatedStudent.firstname,
    updatedStudent.lastname,
    updatedStudent.iscurrent,
  ];
  try {
    const updated = await db.query(query, values);
    console.log(updated.rows[0]);
    res.send(updated.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Hola, Server listening on ${PORT}`);
});
