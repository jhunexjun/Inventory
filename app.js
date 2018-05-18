var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var MongoClient = require('mongodb').MongoClient;

/* admin router here */
var adminIndexRouter = require('./routes/admin/adminIndex');
var usersRouter = require('./routes/admin/users');
var searchUserRouter = require('./routes/admin/searchUser');
var editUser = require('./routes/admin/editUser');

/* public router here */
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');

var app = express();
var config = require('./config.json')[app.get('env')];


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* admin pages here */
app.use('/admin', adminIndexRouter);
app.use('/users', usersRouter); // sample
app.use('/admin/searchUser', searchUserRouter);
app.use('/admin/editUser', editUser);

/* public page here... */
app.use('/', indexRouter);
app.use('/login', loginRouter);

// console.log(process);
//  console.log(config.db_host);
// console.log(app);

MongoClient.connect(`mongodb://${config.db_host}:27017`, (err, client) => {
	if (err) throw err;

	app.locals.dbClient = client;
});


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
