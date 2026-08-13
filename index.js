const express = require('express');
const mongodb = require('./config/db');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

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
