var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const dbConfig = require('./db/DBConfig');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var companyRouter = require('./routes/company');
var jobsRouter = require('./routes/jobs');
var studentRouter = require('./routes/student');
var resumeRouter = require('./routes/resume');
var jobApplyRouter = require('./routes/jobApply');
var session = require('express-session')

var app = express();

app.use(session({
  secret: "session",
  resave: true,
  saveUninitialized: false,
  cookie: {
      maxAge: 1000 * 60 * 60,
  },
}));

mongoose.connect(dbConfig.url,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
  console.log('db connect success!');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/company', companyRouter);
app.use('/jobs', jobsRouter);
app.use('/student', studentRouter);
app.use('/resume', resumeRouter);
app.use('/jobApply', jobApplyRouter);

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
