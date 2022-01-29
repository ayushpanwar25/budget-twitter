import express from 'express';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

passport.use(new LocalStrategy(function verify(username, password, done) {
  User.findOne({ username: username }, function (err, user) {
    if (err) return done(err, false, { message: 'Something went wrong with the database' });
    if (!user) return done(null, false, { message: 'Incorrect username or password' });
    bcrypt.compare(password, user.password, function (err, isMatch) {
      if (err) return done(err, false, { message: 'Something went wrong with the database' });
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect username or password' });
      }
      console.log(user.username + " logged in");
      return done(null, user);
    });
  });
}));

passport.serializeUser(function (user, done) {
  const sessData = { id: user.id, username: user.username, avatar: (user.avatar || undefined) };
  done(null, sessData);
});

passport.deserializeUser(function (miniUser, done) {
  User.findById(miniUser.id, function (err, user) {
    done(err, user);
  });
});

router.use(passport.initialize());
router.use(passport.session());

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) return res.status(401).send(info.message);
    if (!user) return res.status(401).send(info.message);
    req.logIn(user, function (err) {
      if (err) return res.status(401).send(info.message);
      return res.send(req.session.passport.user);
    });
  })(req, res, next);
});

router.post('/signup', (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username: username }).exec((err, user) => {
    if (err) return res.status(500).send('Something went wrong with the database');
    if (user) return res.status(401).send("Username already exists");
    bcrypt
      .hash(password, 12)
      .then(hashedPassword => {
        const user = new User({ username: username, password: hashedPassword });
        user.save();
      })
      .then(res.send("Successfully registered"))
      .catch(err => res.status(401).send(err));
  });
});

router.delete('/logout', (req, res) => {
  const user = req.session.passport.user;
  req.session.destroy((err) => {
    if (err) throw err;
    res.clearCookie("passport");
    res.send("Logged out successfully");
    console.log(user.username + " logged out");
  });
});

router.get('/verify', function (req, res) {
  try {
    const sessUserId = req.session.passport.user.id;
    User.findById(sessUserId, function (err, user) {
      if (err || !user) throw err;
    });
  }
  catch {
    return res.status(401).send('Unauthorized');
  }
  return res.status(200).send(req.session.passport.user);
});

export default router;