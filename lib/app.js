const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const authenticate = require('./middleware/authenticate'); //eslint-disable-line
const app = express();

// Built in middleware
app.use(express.json());
app.use(cookieParser());

//cors origin credentials...
app.use(
  cors({
    origin: [
      //deployed front-end goes here
      '',
      'http://localhost:7890',
      //port for frontend goes here
    ],
    credentials: true,
  })
);

// App routes
// app.use('/api/v1/users', require('./controllers/users'));
//items route goes here 

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
