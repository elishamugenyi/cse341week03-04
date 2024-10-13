const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const router = express.Router();
const path = require('path')//resolves file paths

// Registration route
router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/register.html')); // Serve registration page
});

router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username });
    if (user) return res.status(400).send('User already exists');

    user = new User({ username, password });
    await user.save();
    res.redirect('/login');
  } catch (err) {
    next(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html')); // Serve login page
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/api-docs',
  failureRedirect: '/login',
}));

// GitHub OAuth
router.get('/auth/github', passport.authenticate('github'));

router.get('/oauth2callback/github', passport.authenticate('github', {
  failureRedirect: '/login'
}), (req, res) => {
  res.redirect('/api-docs');
});

// Logout route
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
