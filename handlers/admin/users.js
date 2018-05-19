"use strict";

var express = require('express');
var router = express.Router();

module.exports = function(app) {
	app.namespace('/users', () => {
		// /users/
		router.get('/', (req, res, next) => {
			res.render('admin/userSearch', {
					users: [],
					search: [],
				});
		});

		// /users/search?search=
		router.get('/search', async (req, res, next) => {
			let db = req.app.locals.dbClient.db('inventory');
			let pattern = req.query.search;

			await db.collection('users').find({$or:
				[
					{'name.fName': {$regex: pattern, $options: 'i'}},
					{'name.lName': {$regex: pattern, $options: 'i'}}
				]
			}).toArray(function (err, result) {
				if (err) throw err;
				
				res.render('admin/userSearch', {
					users: result,
					search: req.query.search,
				});
			});
		});

		// /users/edit/454646
		router.get('/edit/:userId', (req, res, next) => {
			let db = req.app.locals.dbClient.db('inventory');
			res.render('admin/usersEdit');
		});
	});

	return router;
}