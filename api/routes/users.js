const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');

const User = require('./models/User');

passport.use(new LocalStrategy(function verify(username, password, done) {
  User.findOne({ username: username }, function (err, user) {
    if (err) return done(err);
    if (!user) return done(null, false, { message: 'Incorrect username or password.' });
    bcrypt.compare(password, user.password, function (err, isMatch) {
      if (err) return done(err);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }
      return done(null, user);
    });
  });
}));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

router.post('/log-in', passport.authenticate('local', function (req, res) {
  const sessUser = { id: req.User.id, username: req.User.username };
  req.session.User = sessUser;
  res.json(sessUser);
}));

router.post("/sign-up", async (req, res) => {
  const { username, password } = req.body;
  User
    .findOne({ username: username })
    .then((user) => {
      if (user) return res.status(400).json("User already exists")
    })
  bcrypt
    .hash(password, 16)
    .then(hashedPassword => {
      const user = new User({ username: username, password: hashedPassword });
      user.save();
    })
    .then(res.json("Successfully registered"))
    .catch(err => res.status(422).json(err));
});

router.get('/log-out', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.clearCookie("session-id");
    res.send("Logged out successfully");
  });
})