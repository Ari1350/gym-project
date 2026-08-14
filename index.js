const express = require('express');
const mongodb = require('./config/db');
const routes = require('./routes');
const session = require('express-session'); 
const passport = require('./config/passport'); 

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

// Configure Sessions (Required for Passport)
app.use(session({
  secret: process.env.SESSION_SECRET || 'gym_secret_session_key_123',
  resave: false,
  saveUninitialized: true
}));

// Initialize Passport and Sessions
app.use(passport.initialize());
app.use(passport.session());

// Use all the routes from our routes folder
app.use('/', routes);

mongodb.initDb((err) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
  } else {
    app.listen(port, () => {
      console.log(`Server connected to DB and running on port ${port}`);
    });
  }
});
