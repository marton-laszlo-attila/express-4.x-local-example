var express = require('express');
var passport = require('passport');
var expressSession = require('express-session');
var morgan = require('morgan');
var connectEnsureLogin = require('connect-ensure-login');
var Strategy = require('passport-local').Strategy;
// A library to help you hash passwords.
const bcrypt = require('bcrypt');
// Loading database
var db = require('./db');

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
  function (username, password, cb) {
    db.users.findByUsername(username, async function (err, user) {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false, "Username not exist");
      }

      await bcrypt.compare(password, user.password)
        .then(function (result) {
          if (result) {
            return cb(null, user, 'OK');
          }
          else return cb(null, false, "Username exist, but the password wrong");
        });

    });
  }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

// Create a new Express application.
var app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/../frontend/build');
app.set('view engine', 'ejs');

// Configure static folder.
app.use(express.static(__dirname + '/../frontend/build'));

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressSession({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Define routes.
app.get('/',
  function (req, res) {
    res.render('home', { user: req.user });
  });

app.get('/login',
  function (req, res) {
    res.render('login');
  });

app.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      return res
        .status(404)
        .send({ error: { status: 404, message: info } }
        );
    }
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      return res
        .send({ user: user, error: { status: 200, message: 'OK' } }
        );
    });
  })(req, res, next);
});

app.get('/logout',
  function (req, res) {
    req.logout();
    res.redirect('/');
  });

app.get('/profile',
  connectEnsureLogin.ensureLoggedIn(),
  function (req, res) {
    res.render('profile', { user: req.user });
  });

app.get('/registration',
  function (req, res) {
    res.render('registration');
  });

app.post('/registration',
  function (req, res) {
    db.users.findByUsername(req.body.username, async function (err, user) {
      if (err) { return cb(err); }
      if (user) {
        res
          .status(404)
          .send({ error: { status: 404, message: 'User name exist' } });
      } else {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const data = { username: req.body.username, password: hashedPassword };
        db.users.saveUsersData(data);
        res
          .send({ error: { status: 200, message: 'Ok' } });
      }
    });
  });

app.listen(3000);
