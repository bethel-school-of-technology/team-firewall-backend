var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var models = require('../models');

passport.use(
    'local',
    new LocalStrategy(function (email, password) {
        models.bankers.findOne({ where: { Email: email}})
        .then(banker => {
            if(!banker){
                return done(null, false, { message: 'Incorrect Email.'})
            }
            if (banker.Password !== password) {
                return done(null, false, { message: 'Incorrect Password'})
            }
            return done(null, banker);
        })
        .catch(err => {
            if(err){
                return done(err);
            }
        });
    })
);

passport.serializeUser((banker, callback) => {
    callback(null, banker.BankerId);
});

passport.deserializeUser((id, callback) => {
    models.bankers
    .findByPk(id)
    .then( banker => callback(null, banker))
    .catch(err => callback(err))
});

module.export = passport;