/* admin router here */
var adminIndexRouter = require('./handlers/admin/adminIndex');
var usersHandlers = require('./handlers/admin/users');

/* public router here */
var indexRouter = require('./handlers/index');
var loginRouter = require('./handlers/login');

module.exports = function(app) {
	/* admin pages here */
	app.use('/admin', adminIndexRouter);
	app.use('/admin/users', usersHandlers(app));

	/* public pages here... */
	app.use('/', indexRouter);
	app.use('/login', loginRouter);
}