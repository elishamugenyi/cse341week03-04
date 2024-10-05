require('dotenv').config();
//require('./index'); //load index.js first

// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const personalDataRoutes = require('./routes/personalDataRoutes');
const {swaggerUi, swaggerDocs} = require('./swagger'); //integrate swagger into server.js

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON bodies
app.use(express.json());

// Redirect to Swagger documentation
app.get('/', (req, res) => {
    res.redirect('/api-docs');
  });

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
app.use('/personaldata', personalDataRoutes)

//error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({error: err.message || 'internal Server Error'});
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
