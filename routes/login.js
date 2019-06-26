var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/login',
  function(req, res, next){
    res.render('login');
  });

/* GET users listing. */
router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res, next) {
    res.redirect('/');
  });

router.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

module.exports = router;
