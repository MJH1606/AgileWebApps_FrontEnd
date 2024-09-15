var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config()

const homeRouter = require('./routes/home');
const loginRouter = require('./routes/login');
const toolsRouter = require('./routes/tools');
const employeesRouter = require('./routes/employees')
const skillsRouter = require('./routes/skills');
const skillCategoryRouter = require('./routes/skillCategory');
const skillDetailsRouter = require('./routes/skillDetails')

const compression = require('compression');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());

app.use('', loginRouter);
app.use('/home', homeRouter);
app.use('/tools', toolsRouter);
app.use('/employees', employeesRouter);
app.use('/skills', skillsRouter);
app.use('/skillCategory', skillCategoryRouter);
app.use('/skillDetails', skillDetailsRouter);

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
