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
app.put("/reviews/:postId", async (req, res) => {
  //This will be the id that I want to find in the DB - the student to be updated
  const post_id = req.params.postId;
  const updateReview = {
    game_name: req.body.game_name,
    title: req.body.title,
    console: req.body.console,
    rating: req.body.rating,
    recommendation: req.body.recommendation,
    username: req.body.username,
    post: req.body.post,
    image_url: req.body.image_url,
  };
  console.log("In the server from the url - the student id", post_id);
  console.log(
    "In the server, from the react - the student to be edited",
    updateReview
  );
  // UPDATE students SET lastname = "something" WHERE id="16";
  const query = `update games set game_name=$1, title=$2, console=$3, rating=$4, recommendation=$5, username=$6, post=$7, image_url=$8 where post_id = ${post_id} RETURNING *`;
  const values = [
    updateReview.game_name,
    updateReview.title,
    updateReview.console,
    updateReview.rating,
    updateReview.recommendation,
    updateReview.username,
    updateReview.post,
    updateReview.image_url,
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

/*************** Admins table ***************/
app.get('/admins', async (req, res) => {
  try {
    const { rows: admins } = await db.query("SELECT * FROM admins");
    res.send(admins);
  } catch (e) {
    return res.status(400).json({ e });
  }
})

/*********** Threads Section ***********/
//retrieve all threads 
app.get('/threads', async (req, res) => {
  try {
    const { rows: admins } = await db.query("SELECT * FROM threads");
    res.send(admins);
  } catch (e) {
    return res.status(400).json({ e });
  }
})

//add new db value
app.post("/threads", async (req, res) => {
  try {
    const result = await db.query(
      `insert into threads(thread_id, title) values(nextval('thread_seq'), $1) RETURNING *`,
      [
       req.body.title
      ]
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

/*********** Comments Section ***********/
app.get('/replies/:id', async (req, res) => {
  try {
    const { rows: comments } = await db.query(`SELECT * FROM comments WHERE thread_id = ${req.params.id}`);
    res.send(comments);
  } catch (e) {
    return res.status(400).json({ e });
  }
})