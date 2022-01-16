const express = require('express');
const router = express.Router();

const Post = require('../models/Post');

router.post("/newpost", async (req, res) => {
  const { author, text } = req.body;
  const post = new Post({ author: author, text: text });
  post
    .save()
    .then(res.json("Posted successfully"))
    .catch(err => res.json(err));
});

router.delete('/deletepost', (req, res) => {
  res.send("Todo");
});

module.exports = router;