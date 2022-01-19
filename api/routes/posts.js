const express = require('express');
const router = express.Router();

const Post = require('../models/Post');

const isAuthenticated = (req) => {
  try {
    const sessUserId = req.session.passport.user.id;
    User.findById(sessUserId, function (err, user) {
      if (err || !user) throw err;
    });
  }
  catch (err) {
    return false;
  }
  return true;
}

router.get("/getAll", async (req, res) => {
  Post.find({}).sort({ posted: 1 }).exec((err, posts) => {
    if (err) throw err;
    res.json(posts);
  });
});

router.get("/get/:authorID", async (req, res) => {
  Post.find({ authorID: req.params.authorID }).sort({ posted: 1 }).exec((err, posts) => {
    if (err) throw err;
    res.json(posts);
  });
});

router.post("/create", async (req, res) => {
  if (!isAuthenticated(req)) return res.status(401).send("Unauthorized");
  else {
    const { author, authorID, text } = req.body;
    const post = new Post({ author: author, authorID: authorID, text: text });
    post
      .save()
      .then(res.json(post))
      .catch(err => console.log(err));
  }
});

router.post("/edit/:id", (req, res) => {
  if (!isAuthenticated(req)) return res.status(401).send("Unauthorized");
  else {
    const text = req.body.text;
    Post.findById(req.params.id).exec(async (err, post) => {
      post.text = text;
      post.save()
        .then(res.json(post))
        .catch(err => res.json(err));
    });
  }
});

router.delete('/delete/:id', (req, res) => {
  if (!isAuthenticated(req)) return res.status(401).send("Unauthorized");
  else {
    Post.findByIdAndDelete(req.params.id).exec(async (err, post) => {
      if (err) throw err;
      res.status(200).json(post.id);
    });
  }
});

module.exports = router;