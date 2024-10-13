require('dotenv').config();
//require('./index'); //load index.js first

// Import modules and depenndancies.
const express = require('express');
const mongoose = require('mongoose');
const itemDataRoutes = require('./routes/itemDataRoutes');
const authRoutes = require('./routes/authRoutes');
const {swaggerUi, swaggerDocs} = require('./swagger'); //integrate swagger into server.js
const passport = require('passport');//for OAuth
const GitHubStrategy = require('passport-github').Strategy;
const session = require('express-session');//for storing session id

//require this user model and strategy --Added today, 13/Oct/2024
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const path = require('path')

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON bodies
app.use(express.json());

//middleware for handling form submissions
app.use(express.urlencoded({ extended: true }));


//Middleware for sessions
app.use(session({
  secret:process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

// Local strategy for username/password login, added 13/Oct/2024
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) return done(null, false, { message: 'Incorrect username.' });

      const isMatch = await user.comparePassword(password);
      if (!isMatch) return done(null, false, { message: 'Incorrect password.' });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
))

// GitHub OAuth Strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/oauth2callback/github"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    //check if user exists
    let user = await User.findOne({githubId: profile.id});

    //if user does not exist, create a new one
    if (!user) {
      user = new User ({ githubId: profile.id, username: profile.username});
      await user.save();
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));
/*function(accessToken, refreshToken, profile, done) {
  // You can add your user database logic here
  return done(null, profile); // 'profile' contains user information
}
))*/

/*// Serialize and deserialize user
passport.serializeUser((user, done) => {
done(null, user);
})
passport.deserializeUser((user, done) => {
done(null, user);
})*/
// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

/*
// Route to start GitHub login
app.get('/auth/github', passport.authenticate('github'))

// OAuth callback route for GitHub
app.get('/oauth2callback/github', passport.authenticate('github', { failureRedirect: '/' }),
(req, res) => {
  // Successful authentication, redirect to Swagger API docs.
  res.redirect('/api-docs');
}
)*/

// Middleware to protect routes
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

//add static files before defining routes
app.use(express.static('public'));

//define authRoutes to show the login page first on loading
app.use('/', authRoutes)

//define routes
app.use('/itemdata', itemDataRoutes)

//use swagger UI middleware
app.use('/api-docs', ensureAuthenticated, swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Redirect to login page for unlogged user, added today 13/Oct/2024
app.get('/', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.send(
      `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome</title>
        <link rel="stylesheet" href="css/styles.css"> <!-- Link to your CSS file -->
      </head>
      <body>
        <div class="container">
          <h1>Welcome to the API Docs</h1>
          <p>Please login to see more details.</p>
          <p>Sign in with <a href="/auth/github">GitHub</a> or <a href="/login">Login with username/password</a>.</p>
        </div>
      </body>
      </html>
      `)
  }  
  res.redirect('/api-docs');
  });

//login route
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/login.html'));
});

//Register route
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/register.html'));
});


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
