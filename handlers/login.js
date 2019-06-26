var passport = require('passport');


exports = module.exports = [
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
];
