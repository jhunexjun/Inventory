var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
	res.render('searchUser', {
		'protocolAndHostname': req.protocol + '://' + req.hostname + ':' + (process.env.PORT || '3000')
	});
});

module.exports = router;