const express = require('express');
const Route = express.Router();

Route.use('/auth', require('./auth'));

module.exports = Route;
