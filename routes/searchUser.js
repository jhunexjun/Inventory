var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient

router.get('/', (req, res, next) => {
	MongoClient.connect('mongodb://localhost:27017', function (err, client) {
		if (err) throw err

		var db = client.db('inventory');

		var pattern = '';

		if (typeof(req.query.search) != 'undefined') {
			pattern = req.query.search;
		}

		db.collection('users').find({'name.fName': {$regex: pattern, $options: 'i'}}).toArray(function (err, result) {
			if (err) throw err

			if (typeof(req.query.search) == 'undefined') {
				result = [];
			}
			
			res.render('searchUser', {
				protocolAndHostname: req.protocol + '://' + req.hostname + ':' + (process.env.PORT || '3000'),
				users: result,
				search: req.query.search,
			});
		});
	});
});

module.exports = router;