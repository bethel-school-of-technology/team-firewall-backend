var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
const models = require('../models');
var authService = require("../services/auth");
var passwordService1 = require("../services/password");
var passwordService2 = require("../services/password");

console.log(authService);

/* GET home page. */


router.post('/signup/banker', function (req, res, next) {
  models.bankers.findOrCreate({
    where: {
      Email: req.body.email
    },
    defaults: {
      FirstName: req.body.firstName,
      LastName: req.body.lastName,
      Password: passwordService1.hashPassword(req.body.password)
    }
  }).spread(function (result, created) {
    //console.log(result);
    if (created) {
      res.send('User created')
    } else {
      res.send('User already exists')
    }
  }
  );
});

router.post('/signup/admin', function (req, res, next) {
  models.admin.findOrCreate({
    where: {
      Email: req.body.email
    },
    defaults: {
      FirstName: req.body.firstName,
      LastName: req.body.lastName,
      Password: passwordService2.hashPassword(req.body.password)
    }
  }).spread(function (result, created) {
    //console.log(result);
    if (created) {
      res.send('Admin created')
    } else {
      res.send('Admin already exists')
    }
  }
  );
});

router.post('/login/banker', function (req, res, next) {
  try {
    models.bankers.findOne({
      where: {
        Email: req.body.email,
      }
    }).then(banker => {
      if (!banker) {
        console.log('User not found');
      } else {
        let passwordMatch = passwordService1.comparePasswords(req.body.password, banker.Password);
        if (!passwordMatch) {
          console.log("Wrong Password");
          res.send("Wrong Password")
        } else {
          let token = authService.assignToken(banker);
          res.json({ message: "login Successful", status: 200, token})
        }
      }
    });
  } catch (err) {
    console.log(err);
  }

});


router.post('/login/admin', function (req, res, next) {
  try {
    models.admin.findOne({
      where: {
        Email: req.body.email,
      }
    }).then(admin => {
      if (!admin) {
        console.log('User not found');
      } else {
        let passwordMatch = passwordService2.comparePasswords(req.body.password, admin.Password);
        if (!passwordMatch) {
          console.log("Wrong Password");
          res.send("Wrong Password")
        } else {
          let token = authService.signUser2(admin);
          res.cookie('jwt', token);
        }
      }
    });
  } catch (err) {
    console.log(err);
  }

});

router.get('/loans')

router.get('/loans/:id')

router.get('/profile/:id')

router.post('/addloan')

router.delete('/deleteloan')


module.exports = router;
