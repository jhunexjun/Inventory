var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		'protocolAndHostname': req.protocol + '://' + req.hostname + ':' + (process.env.PORT || '3000')
	});
});

module.exports = router;
