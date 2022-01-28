import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import cors from 'cors';
import { URL } from 'url';
import usersRoute from './routes/users.js';
import postsRoute from './routes/posts.js';

const __dirname = new URL('.', import.meta.url).pathname;

const app = express();
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
app.use('/static', express.static('public'));

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

app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.options('/', cors(corsOptions));

app.use('/api/users', usersRoute);
app.use('/api/posts', postsRoute);

app.listen(process.env.PORT, () => console.log("API listening on port " + process.env.PORT));