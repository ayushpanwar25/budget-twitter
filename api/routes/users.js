const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

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
  const sessData = { id: user.id, username: user.username };
  done(null, sessData);
});

passport.deserializeUser(function (miniUser, done) {
  User.findById(miniUser.id, function (err, user) {
    done(err, user);
  });
});

router.use(passport.initialize());
router.use(passport.session());

router.post('/log-in', passport.authenticate('local'), function (req, res) {
  //console.log(req.user);
  res.json(req.session.passport.user);
});

router.post("/sign-up", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  User
    .findOne({ username: username })
    .then((user) => {
      if (user) return res.json("username already exists");
    })
  bcrypt
    .hash(password, 16)
    .then(hashedPassword => {
      const user = new User({ username: username, password: hashedPassword });
      user.save();
    })
    .then(res.json("Successfully registered"))
    .catch(err => res.json(err));
});

router.get('/log-out', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.clearCookie("session-id");
    res.send("Logged out successfully");
  });
})

router.get('/verify', function (req, res) {
  try {
    const sessUser = req.session.passport.user;
  }
  catch (err) {
    return res.status(401).send("Unauthorized");
  }
  return res.json(req.session.passport.user);
}
);

module.exports = router;