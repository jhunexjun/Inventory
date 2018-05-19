var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
	res.render('admin/adminIndex');
});

/* POST home page. */
router.get('/', function(req, res, next) {
	res.render('admin/adminIndex');
});


module.exports = router;
