const { error } = require('console');
var express = require('express');
var router = express.Router();
const models = require('../models');
var authService = require("../services/auth");
var passwordService1 = require("../services/password");
var passwordService2 = require("../services/password");

router.post('/signup/banker', function (req, res, next) {
  try {
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
  catch (err) {
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
      res.json({
        message: "User Not Found",
        status: 403
      })
    } else {
      let passwordMatch = passwordService1.comparePasswords(req.body.password, banker.Password);
      if (!passwordMatch) {
        console.log("Wrong Password");
        res.json({
          message: "Wrong Password",
          status: 403
        })
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

router.get('/banker', function(req, res, next){
  let token = req.headers.authorization;
  models.bankers
  authService.verifyUser(token).then(banker => {
    if (banker){
      models.bankers.findOne({
        where: {
          BankerId: banker.BankerId
        },
        include: [{
          attributes: ['Name'],
          model: models.banks
        }]
      }).then(bankerFound => {
        res.json(bankerFound)
      })
    }
  })
})

router.post('/login/admin', function (req, res, next) {
  try {
    models.admin.findOne({
      where: {
        Email: req.body.email,
      }
    }).then(admin => {
      if (!admin) {
        res.json({
          message: "Admin Not Found",
          status: 403
        });
      } else {
        let passwordMatch = passwordService2.comparePasswords(req.body.password, admin.Password);
        if (!passwordMatch) {
          console.log("Wrong Password");
          res.json({
            message: "Wrong Password"
          });
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
  let token = req.headers.authorization;
  console.log("this admin route has been called");
  console.log(req.headers)
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
        Name: req.body.name
      }
    }).spread(function (result, created) {
      console.log(result);
      if (created) {
        res.json({
          message: "Bank Successfully Created",
          status: 200
        })
      } else {
        res.json({
          message: "Bank Already Exists",
          status: 403
        });
      }
    });
  } catch (err) {
    console.log(err)
  }

});

router.get('/loans', function (req, res, next) {
  let token = req.headers.authorization;
  models.bankers
  authService.verifyUser(token).then(banker => {
    if (banker) {
        models.loans.findAll({
          where: {
            Deleted: false,
            BankId: banker.BankId
          }
        }).then(loansFound => {
          res.json(loansFound)
        })
    } else {
      res.send("Need to log in")
    }
  });
});

router.get('/loanstosell', function(req, res, next){
  let token = req.headers.authorization;
  models.bankers
  authService.verifyUser(token).then(banker => {
    if (banker) {
      models.loans.findAll({
        where: {
          ForSale: false,
          Deleted: false,
          BankId: banker.BankId
        },
        include: [{
          attributes: ['Name'],
          model: models.banks
        }]
      }).then(loansFound => {
        res.json(loansFound)
      });
    } else {
      res.json({
        message: "No Loans Found",
        status: 403
      });
    }
  });
});

router.get('/loansforsale', function (req, res, next){
  let token = req.headers.authorization;
  models.bankers
  authService.verifyUser(token).then(banker => {
    if (banker) {
      models.loans.findAll({
        where: {
          ForSale: true,
          Deleted: false,
          BankId: {$not: banker.BankId}
        },
        include: [{
          attributes: ['Name'],
          model: models.banks
        }]
      }).then(loansFound => {
        res.json(loansFound)
      });
    } else {
      res.json({
        message: "No Loans Found",
        status: 403
      });
    }
  });
});

router.get('/loan/:id', function (req, res, next) {
  let token = req.headers.authorization;
  models.bankers
  authService.verifyUser(token).then(banker => {
    if (banker) {
      let loanId = parseInt(req.params.id);
      models.loans.findOne({
        where: { LoanId: loanId }
      }).then(loanFound => {
        res.json({loan: loanFound})
      });
    } else {
      res.send('Please login.')
    }
  });
});

router.get('/portfolio/:id', function (req, res, next) {
  let token = req.headers.authorization;
  models.bankers
  authService.verifyUser(token).then(banker => {
    if (banker) {
      let bankId = parseInt(req.params.id)
      models.banks.findOne({
        where: {
          BankId: bankId
        }
      }).then(bankFound => {
        if (bankFound) {
          models.loans.findAll({
            where: {
              BankId: bankFound.BankId,
              Deleted: false
            }
          }).then(loansFound => {
            if (loansFound) {
              res.json(loansFound);
            } else {
              res.send("No loans Found");
            }
          })
        } else {
          res.send("No Bank Found");
        }
      })
    } else {
      res.send("Please Log In");
    }
  });
});

router.get('/employees/:id', function(req, res, next){
  let token = req.headers.authorization;
  models.bankers
  authService.verifyUser(token).then(banker => {
    if (banker) {
      let bankId = parseInt(req.params.id)
      models.banks.findOne({
        where: {
          BankId: bankId
        }
      }).then(bankFound => {
        if (bankFound) {
          models.bankers.findAll({
            where: {
              BankId: bankId
            }
          }).then(bankersFound => {
            res.json(bankersFound)
          });
        } else {
          res.json({
            message: "Bank not found",
            status: 200
          });
        }
      });
    } else {
      res.json({
        message: "Not logged In",
        status: 405
      });
    }
  });
});

router.post('/addloan', function (req, res, next) {
  let token = req.headers.authorization;
  if (token) {
    authService.verifyUser(token)
      .then(banker => {
        if (banker) {
          // bankFound = parseInt(req.params.id);
          models.loans.findOrCreate({
            where: { AccountNumber: req.body.accountNumber },
            defaults: {
              FirstName: req.body.firstName,
              LastName: req.body.lastName,
              LoanAmmount: req.body.amount,
              Address: req.body.address,
              BankId: banker.BankId
            }
          }).spread(function (result, created) {
            console.log(result);
            if (created) {
              res.json({
                message: "Loan Added",
                status: 200
              })
            } else {
              res.json({
                message: "Loan Did Not Add",
                status: 403
              })
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

router.post('/deleteloan/:id', function (req, res, next) {
  let token = req.headers.authorization;
  models.bankers
  authService.verifyUser(token).then(banker => {
    if (banker) {
      let loanId = parseInt(req.params.id);
      models.loans.update({ Deleted: true }, {
        where: { LoanId: loanId }
      }).then(result => {
        res.send(result)
      }).catch(err => {
        res.status(err);
      })
    } else {
      res.send("Need to be logged in")
    }
  });
});

router.post('/unsellloan/:id', function (req, res, next) {
  let token = req.headers.authorization;
  models.bankers
  authService.verifyUser(token).then(banker => {
    if (banker) {
      let loanId = parseInt(req.params.id);
      models.loans.update({
        ForSale: false
      }, 
      {where: {
        LoanId: loanId,
        Deleted: false
      }
    }).then(result => {
      res.json({
        message: "Loan is no loger for sale."
      });
    });
    } else {
      res.json({
        message: "Loan is not for sale.",
        status: 403
      });
    }
  });
});

router.post('/sellloan/:id', function (req, res, next) {
  let token = req.headers.authorization;
  models.bankers
  authService.verifyUser(token).then(banker => {
    if (banker) {
      let loanId = parseInt(req.params.id);
      models.loans.update({ ForSale: true }, {
        where: {
          LoanId: loanId,
          Deleted: false
        }
      }).then(result => {
        res.json({
          message: "Loan For Sale"
        })
      }).catch(err => {
        res.status(err);
      })
    } else {
      res.send("Need to be logged in")
    }
  });
});


router.get('/homepage', function (req, res, next) {
  let token = req.headers.authorization;
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

router.post('/buyloan/:id', function (req, res, next) {
  let token = req.headers.authorization;
  models.bankers
  authService.verifyUser(token).then(banker => {
    if (banker) {
      let bankId = banker.BankId;
      let loanId = parseInt(req.params.id);
      models.loans.update({ BankId: bankId, ForSale: false }, {
        where: { LoanId: loanId },
      }).then(results => {
        console.log(results);
        res.json({
          message: "Purchase Successfull"
        });
      });
    } else {
      res.send('Please Log In');
    }
  });
});


module.exports = router;
