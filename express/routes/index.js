var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
const models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup', function(req, res, next) {
  models.bankers.findOrCreate({
    where: {
      Email: req.body.email
    },
    defaults: {
      FirstName: req.body.firstName,
      LastName: req.body.lastName,
      Password: req.body.password
    }
  }).spread(function (result, created){
    if(req.body.password =! req.body.confirmPassword){
      res.send('Passwords do not match.')
    } else {
      if (created) {
        res.send('User created')
      } else {
        res.send('User already exists')
      }
    }
  });
});

module.exports = router;
