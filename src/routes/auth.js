const Router = require('express').Router();
const register = require('../controllers/auth/register');
Router.post('/register', register)

module.exports = Router;
