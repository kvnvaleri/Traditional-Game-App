var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session');
const flash = require ('express-flash');
const env = require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var dashboardRouter = require('./routes/dashboard');
var authRouter = require('./routes/auth');
var roomRouter = require('./routes/room')
var matchRouter = require('./routes/match')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SECRET_CODE,
  resave: false,
  saveUninitialized: false
}))

const passport = require('./lib/passport')
const passportJwt = require('./lib/passportJwt')
app.use(passport.initialize())
app.use(passport.session())
app.use(passportJwt.initialize())

app.use(flash())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dashboard', dashboardRouter);
app.use('/auth', authRouter);
app.use('/room', roomRouter);
app.use('/fight', matchRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
