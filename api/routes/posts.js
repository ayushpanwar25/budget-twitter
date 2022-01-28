import express from 'express';
import multer from 'multer';
import { ImagePool } from '@squoosh/lib';
import { cpus } from 'os';
import fs from 'fs/promises';
import Post from '../models/Post.js';
import User from '../models/User.js';
const router = express.Router();

const upload = multer({
  limits: {
    fileSize: 2000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|gif|webp)$/)) {
      return cb(
        new Error(
          'only upload images of max 2MB.'
        )
      );
    }
    cb(undefined, true);
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

const imgProcess = async (originalimage) => {
  const imagePool = new ImagePool(cpus().length);
  const image = imagePool.ingestImage(originalimage);
  await image.decoded;
  const encodeOptions = {
    webp: {
      quality: 75
    },
  };
  await image.encode(encodeOptions);
  const rawEncodedImage = (await image.encodedWith.webp).binary;
  const imgPath = `/images/${Date.now() + '-' + Math.round(Math.random() * 1E9) + '.webp'}`;
  fs.writeFile(`${'public' + imgPath}`, rawEncodedImage);
  await imagePool.close();
  return imgPath;
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

router.post('/create', isAuthenticated, upload.single('file'), async (req, res) => {
  const { author, authorID, text } = req.body;
  let post;
  if (!req.file) {
    post = new Post({
      author: author,
      authorID: authorID,
      text: text
    });
    post
      .save()
      .then(res.json(post))
      .catch(err => console.log(err));
  }
  else {
    imgProcess(req.file.buffer)
      .then(async (imagePath) => {
        post = new Post({
          author: author,
          authorID: authorID,
          text: text,
          image: imagePath
        });
      })
      .then(() => {
        post
          .save()
          .then(res.json(post))
          .catch(err => console.log(err));
      })
      .catch((err) => {
        res.send("Interal error. Can't save image");
      });
  }
});

router.post('/:id/edit', isAuthenticated, (req, res) => {
  Post.findOneAndUpdate({ _id: req.params.id, authorID: req.session.passport.user.id }, { text: req.body.text }, { new: true }).exec(async (err, post) => {
    if (err) return res.status(401).send('Unauthorized');
    return res.json(post);
  });
});

router.get('/:id/like', isAuthenticated, async (req, res) => {
  /*'like' feature was an afterthought and it does not go well with NoSQL*/
  Post.findById(req.params.id).exec((err, post) => {
    if (err) throw err;
    if (post.likes.includes(req.session.passport.user.id)) return res.status(401).send('Already liked');
    let likes = post.likes;
    likes.push(req.session.passport.user.id);
    post.likes = likes;
    post.save();
    return res.json({ id: post.id, numLikes: post.likes.length });
  });
});

router.get('/:id/dislike', isAuthenticated, async (req, res) => {
  Post.findById(req.params.id).exec((err, post) => {
    if (err) throw err;
    if (!post.likes.includes(req.session.passport.user.id)) return res.status(401).send('Have not liked');
    post.likes = post.likes.filter(item => item !== req.session.passport.user.id);
    post.save();
    return res.json({ id: post.id, numLikes: post.likes.length });
  });
});

router.delete('/:id/delete', isAuthenticated, (req, res) => {
  Post.findOneAndDelete({ _id: req.params.id, authorID: req.session.passport.user.id }).exec(async (err, post) => {
    if (err) return res.status(401).send('Unauthorized');
    return res.status(200).json(req.params.id);
  });
});

export default router;