require('dotenv').config();
//require('./index'); //load index.js first

// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const itemDataRoutes = require('./routes/itemDataRoutes');
const {swaggerUi, swaggerDocs} = require('./swagger'); //integrate swagger into server.js
const passport = require('passport');//for OAuth
//const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const session = require('express-session');//for storing session id

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON bodies
app.use(express.json());

//Middleware for sessions
app.use(session({
  secret:process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

// GitHub OAuth Strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/oauth2callback/github"
},
function(accessToken, refreshToken, profile, done) {
  // You can add your user database logic here
  return done(null, profile); // 'profile' contains user information
}
))

// Serialize and deserialize user
passport.serializeUser((user, done) => {
done(null, user);
})
passport.deserializeUser((user, done) => {
done(null, user);
})

// Route to start GitHub login
app.get('/auth/github', passport.authenticate('github'))

// OAuth callback route for GitHub
app.get('/oauth2callback/github', passport.authenticate('github', { failureRedirect: '/' }),
(req, res) => {
  // Successful authentication, redirect to Swagger API docs.
  res.redirect('/api-docs');
}
)

//define routes
app.use('/itemdata', itemDataRoutes)

// Redirect to Swagger documentation
/*app.get('/', (req, res) => {
    res.redirect('/api-docs');
  });*/

//use swagger UI middleware
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//connect to MongoDB
mongoose.connect(process.env.DB_URI, {
    //userNewUrlParser: true,
    //userUnifiedTopology: true,
    dbName: 'electronics', //connect to the 'users' database
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

//define routes
//app.use('/itemdata', personalDataRoutes)

//error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({error: err.message || 'internal Server Error'});
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
