"use strict";

var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

router.get('/', async (req, res, next) => {
	if (typeof(req.query.search) != 'undefined') {
		let db = req.app.locals.dbClient.db('inventory');
		let pattern = req.query.search;

		await db.collection('users').find({$or:
			[
				{'name.fName': {$regex: pattern, $options: 'i'}},
				{'name.lName': {$regex: pattern, $options: 'i'}}
			]
		}).toArray(function (err, result) {
			if (err) throw err;
			
			res.render('searchUser', {
				users: result,
				search: req.query.search,
			});
		});
	} else {
		res.render('searchUser', {
			users: [],
			search: req.query.search,
		});
	}
});

module.exports = router;