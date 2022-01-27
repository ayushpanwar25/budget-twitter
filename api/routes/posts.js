const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '/public/images');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname);
  }
});

const isAuthenticated = (req, res, next) => {
  try {
    const sessUserId = req.session.passport.user.id;
    User.findById(sessUserId, function (err, user) {
      if (err || !user) throw err;
    });
  }
  catch {
    return res.status(401).send('Unauthorized');
  }
  next();
}

router.get('/get', async (req, res) => {
  Post.find({}).sort({ posted: -1 }).exec((err, posts) => {
    if (err) throw err;
    res.json(posts);
  });
});

router.get('/:authorID/get', async (req, res) => {
  Post.find({ authorID: req.params.authorID }).sort({ posted: -1 }).exec((err, posts) => {
    if (err) throw err;
    res.json(posts);
  });
});

router.post('/create', isAuthenticated, async (req, res) => {
  const { author, authorID, text } = req.body;
  const post = new Post({
    author: author,
    authorID: authorID,
    text: text
  });
  post
    .save()
    .then(res.json(post))
    .catch(err => console.log(err));
});

router.post('/img/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    console.log("Image upload failed");
    return res.send({
      success: false
    });
  }
  else {
    console.log("Image uploaded");
    return res.send({
      success: true
    })
  }
});

router.post('/:id/edit', isAuthenticated, (req, res) => {
  Post.findOneAndUpdate({ _id: req.params.id, authorID: req.session.passport.user.id }, { text: req.body.text }).exec(async (err, post) => {
    if (err) return res.status(401).send('Unauthorized');
    return res.json(post);
  });
});

router.get('/:id/like', isAuthenticated, async (req, res) => {
  /*really messy and slow. 'like' feature was an afterthought and it does not go well with NoSQL*/
  Post.findById(req.params.id).exec((err, post) => {
    if (err) throw err;
    if (post.likes.includes(req.session.passport.user.id)) return res.status(401).send('Already liked');
    let likes = post.likes;
    likes.push(req.session.passport.user.id);
    post.likes = likes;
    post.save();
    return res.json(post);
  });
});

router.get('/:id/dislike', isAuthenticated, async (req, res) => {
  Post.findById(req.params.id).exec((err, post) => {
    if (err) throw err;
    if (!post.likes.includes(req.session.passport.user.id)) return res.status(401).send('Have not liked');
    post.likes = post.likes.filter(item => item !== req.session.passport.user.id);
    post.save();
    return res.json(post);
  });
});

router.delete('/:id/delete', isAuthenticated, (req, res) => {
  Post.findOneAndDelete({ _id: req.params.id, authorID: req.session.passport.user.id }).exec(async (err, post) => {
    if (err) return res.status(401).send('Unauthorized');
    return res.status(200).json('Post deleted');
  });
});

module.exports = router;