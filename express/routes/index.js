const { error } = require('console');
var express = require('express');
var router = express.Router();
const models = require('../models');
var authService = require("../services/auth");
var passwordService1 = require("../services/password");
var passwordService2 = require("../services/password");

router.post('/signup/banker', function (req, res, next) {
  try{ 
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
      }).spread(function (result, created, err) {
        //console.log(result);
        if (created) {
          res.json({
            message: "Banker Created successfully",
            status: 200
          })
        } else {
          res.json({
            message: "User already exists",
            status: 403
          })
        }
      }
      );
    }
  })
}   
catch(err){
  console.log(err);
  res.send("error");
}
});

router.get('/findbanks', function (req, res, next) {
  models.banks.findAll({
    Name: req.body.bankName
  }).then(result => {
    res.json(result)
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
      res.json({
        message: "Admin Created successfully",
        status: 200
      })
    } else {
      res.json({
        message: "Admin already exists",
        status: 403
      })
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
          res.cookie('jwt', token);
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

router.get('/admin', function (req, res, next) {
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

router.get('/loans', function(req, res, next){
  let token = req.cookies.jwt;
  models.bankers
  authService.verifyUser(token).then(banker =>{
    if(banker){
      models.loans.findAll({
        where: { Deleted: false}
      }).then(loansFound => {
        res.json(loansFound)
      })
    }else {
      res.send("Need to log in")
    }
  });
});

router.get('/loans/:id', function(req, res, next){
  let token = req.cookies.jwt;
  models.bankers
  authService.verifyUser(token).then(banker => {
    if(banker){
      let loanId = parseInt(req.params.id);
      models.loans.findOne({
        where :{ LoanId: loanId}
      }).then(loanFound => {
        res.json(loanFound)
      });
    } else{
      res.send('Please login.')
    }
  });
});

router.get('/portfolio/:id', function(req, res, next){
  let token = req.cookies.jwt;
  models.bankers
  authService.verifyUser(token).then(banker =>{
    if(banker){
      let bankId = parseInt(req.params.id)
      models.banks.findOne({ where: {
        BankId: bankId
      }}).then(bankFound => {
        if(bankFound){
          models.loans.findAll({
            where: {
              BankId: bankFound.BankId,
              Deleted: false
            }
          }).then(loansFound => {
            if(loansFound){
              let responsePortfolio = {
                BankName: bankFound.Name,
                Loans: loansFound
              }
              res.json(responsePortfolio);
            } else {
              res.send("No loans Found");
            }
          })
        } else {
          res.send("No Bank Found");
        }
      })
    } else{
      res.send("Please Log In");
    }
  });
});

router.post('/addloan/:id', function (req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token)
      .then(banker => {
        if (banker) {
          bankFound = parseInt(req.params.id);
          models.loans.findOrCreate({
            where: { AccountNumber: req.body.accountNumber },
            defaults: {
              FirstName: req.body.firstName,
              LastName: req.body.lastName,
              LoanAmmount: req.body.amount,
              Address: req.body.address,
              BankId: bankFound
            }
          }).spread(function (result, created) {
            console.log(result);
            if (created) {
              res.send('Loan Created');
            } else {
              res.send('Loan already exists')
            }
          });
        } else {
          res.send('Please log in.')
        }
      }
      );
  } else {
    res.send(error);
  }
});

router.post('/deleteloan/:id', function(req, res, next){
  let token = req.cookies.jwt;
  models.bankers
  authService.verifyUser(token).then(banker => {
    if(banker) {
      let loanId = parseInt(req.params.id);
      models.loans.update({Deleted: true}, {
        where: {LoanId: loanId}
      }).then(result => {
        res.send(result)
      }).catch(err =>{
        res.status(err);
      })
    } else {
      res.send("Need to be logged in")
    }
  });
});

router.post('/sellloan/:id', function(req, res, next){
  let token = req.cookies.jwt;
  models.bankers
  authService.verifyUser(token).then(banker => {
    if(banker) {
      let loanId = parseInt(req.params.id);
      models.loans.update({ForSale: true}, {
        where: {LoanId: loanId,
        Deleted: false}
      }).then(result => {
        res.send(result)
      }).catch(err =>{
        res.status(err);
      })
    } else {
      res.send("Need to be logged in")
    }
  });
});


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

router.post('/buyloan/:id', function(req, res, next) {
  let token = req.cookies.jwt;
  models.bankers
  authService.verifyUser(token).then(banker => {
    if(banker){
      let bankId = banker.BankId;
      let loanId = parseInt(req.params.id);
      models.loans.update({ BankId: bankId}, {
        where: {LoanId: loanId},
      }).then(results => {
        console.log(results);
        res.send('Purchase Successfull');
      });
    } else {
      res.send('Please Log In');
    }
  });
});


module.exports = router;
