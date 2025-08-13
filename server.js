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

// Public image folder
app.use(express.static('public'));

// Middleware
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

// Restrict POST, PUT, DELETE to logged-in users
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ error: 'You must be logged in to perform this action.' });
}

// Apply middleware only to these methods
app.use((req, res, next) => {
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    return ensureAuthenticated(req, res, next);
  }
  next();
});

// Routes
app.use('/', require('./routes'));

// Passport
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Auth
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
    res.send(`
      <h2>Welcome, ${req.user.displayName || req.user.username}!</h2>
      <p><a href="/logout">Logout</a></p>
    `);
  } else {
    res.send(`
      <div style="text-align:center; margin-top:50px;">
        <h2>You are not logged in.</h2>
        <img src="/images/welcome.png" alt="Welcome" style="max-width:300px; margin: 20px auto;" />
        <p><a href="/auth/github" style="font-size: 18px;">Please login with GitHub to view your collection</a></p>
      </div>
    `);
  }
});

// DB
mongodb.initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(port, () => {
      console.log(`✅ Database connected. Server running on port ${port}`);
    });
  }
});
