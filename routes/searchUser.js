var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient

router.get('/', (req, res, next) => {
	const protocolAndHostname = req.protocol + '://' + req.hostname + ':' + (process.env.PORT || '3000');

	if (typeof(req.query.search) != 'undefined') {
		MongoClient.connect('mongodb://localhost:27017', function (err, client) {
			if (err) throw err

			var db = client.db('inventory');
			var pattern = req.query.search;

			db.collection('users').find({$or:
				[
					{'name.fName': {$regex: pattern, $options: 'i'}},
					{'name.lName': {$regex: pattern, $options: 'i'}}
				]
			}).toArray(function (err, result) {
				if (err) throw err
				
				res.render('searchUser', {
					protocolAndHostname: protocolAndHostname,
					users: result,
					search: req.query.search,
				});
			});
		});
	} else {
		res.render('searchUser', {
			protocolAndHostname: protocolAndHostname,
			users: [],
			search: req.query.search,
		});
	}
});

module.exports = router;