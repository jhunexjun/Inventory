"use strict";

var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

router.get('/', function(req, res, next) {
	const protocolAndHostname = req.protocol + '://' + req.hostname + ':' + (process.env.PORT || '3000');

	if (typeof(req.query.userId) == 'undefined') {
		// check if early exit is allowed.
	} else {
		MongoClient.connect('mongodb://localhost:27017', function(err, client) {
			if (err) throw err;

			let db = client.db('inventory');

			res.render('editUser', {
				protocolAndHostname: protocolAndHostname,
			});
		});
	}
});

module.exports = router;