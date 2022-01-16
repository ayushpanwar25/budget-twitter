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
app.use(session({
  name: process.env.COOKIE_NAME,
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
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("connected to lidl-twitter-api");
});

app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));

app.listen(process.env.PORT, () => console.log("app listening on port " + process.env.PORT));