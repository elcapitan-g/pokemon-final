require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// --- Middleware ---
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Z-Key']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// --- Routes ---
app.use('/', require('./routes')); // <-- Make sure routes/index.js loads /cards

// --- Passport GitHub Strategy ---
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// --- Auth Routes ---
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

app.get('/logout', (req, res) => {
  req.logout(() => res.redirect('/'));
});

app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`<h2>Welcome, ${req.user.displayName || req.user.username}!</h2><p><a href="/logout">Logout</a></p>`);
  } else {
    res.send(`<h2>You are not logged in.</h2><p><a href="/auth/github">Login with GitHub</a></p>`);
  }
});

// --- DB Connection ---
mongodb.initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(port, () => {
      console.log(`✅ Database connected. Server running on port ${port}`);
    });
  }
});
