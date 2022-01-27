const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGO_URL,
  collectionName: 'sessions'
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public')))

/*app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "text/plain,Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
  next();
})*/

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    maxAge: 300000,
    sameSite: false,
    secure: false
  }
}));

const corsOptions = {
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send("connected to budget-twitter-api");
});

app.options('/', cors(corsOptions));

app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));

app.listen(process.env.PORT, () => console.log("API listening on port " + process.env.PORT));