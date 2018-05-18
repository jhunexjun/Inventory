"use strict";

var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

router.get('/', async function(req, res, next) {
	if (typeof(req.query.userId) == 'undefined') {
		// check if early exit is allowed.
	} else {
		let db = req.app.locals.dbClient.db('inventory');

		res.render('admin/editUser');
	}
});

module.exports = router;