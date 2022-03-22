
  
const express = require('express');
const server = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const { port } = require('./src/configs');
const mainNavigation = require('./src/routes');

server.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
server.use(bodyParser.json());
server.use(morgan('dev'));
server.use(cors());
server.use('/', mainNavigation);



server.listen(
  port,
  console.log(`This server is running on port ${port}`),
  (err) => {
    if (err) {
      throw err;
    }
  }
);