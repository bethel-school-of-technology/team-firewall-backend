var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
const models = require('../models');
var authService = require("../services/auth");
var passwordService1 = require("../services/password");
var passwordService2 = require("../services/password");

router.post('/signup/banker', function (req, res, next) {
  models.banks.findOne({
    where: { Name: req.body.bankName }
  }).then(bankFound => {
    if (bankFound) {
      models.bankers.findOrCreate({
        where: {
          Email: req.body.email
        },
        defaults: {
          FirstName: req.body.firstName,
          LastName: req.body.lastName,
          Password: passwordService1.hashPassword(req.body.password),
          BankId: bankFound.BankId
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
    }
  })
});

router.get('/findbanks', function (req, res, next) {
  models.banks.findAll({
    Name: req.body.bankName
  })
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
  });
});


router.post('/login/banker', async function (req, res, next) {
  try {
    let banker = await models.bankers.findOne({
      where: {
        Email: req.body.email,
      }
    });
    if (!banker) {
      console.log('User not found');
    } else {
      let passwordMatch = passwordService1.comparePasswords(req.body.password, banker.Password);
      if (!passwordMatch) {
        console.log("Wrong Password");
        res.send("Wrong Password")
      } else {
        let token = authService.assignToken(banker);
        res.json({ message: "login Successful", status: 200, token });

      }
    }

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
          let token = authService.assignToken2(admin);
          res.cookie('jwt', token);
          res.json({ message: "login Successful", status: 200, token });

        }
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.get('/bankerlist', function (req, res, next) {
  let token = req.cookies.jwt;
  authService.verifyUser2(token).then(admin => {
    if (admin) {
      models.bankers.findAll({
        include: [{
          attributes: ['Name'],
          model: models.banks
        }]
      }).then(bankersFound => {
        res.json(bankersFound)
      })
    } else {
      res.send('Access Denied!')
    }
  });
});

router.post('/addbank', function (req, res, next) {
  try {
    models.banks.findOrCreate({
      where: {
        Name: req.body.bankName
      }
    }).spread(function (result, created) {
      console.log(result);
      if (created) {
        res.send('Bank Created')
      } else {
        res.send('Bank already Exists')
      }
    });
  } catch (err) {
    console.log(err)
  }

});

router.get('/loans')

router.get('/loans/:id')

router.get('/profile/:id')

router.post('/addloan')

router.put('/deleteloan')

router.get('/homepage', function (req, res, next) {
  let token = req.cookies.jwt;
  authService.verifyUser(token).then(banker => {
    if (banker) {
      models.loans.findAll({
        where: {
          Deleted: false,
          ForSale: true
        },
        include: [{
          attributes: ['Name'],
          model: models.banks
        }]
      }).then(loansFound => {
        res.json(loansFound)
      });
    } else {
      res.send('Please Login!')
    }
  });
});


module.exports = router;
