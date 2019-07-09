var express = require('express');
var router = express.Router();

router.get('/', async(req, res, next) => {
    let db = req.app.locals.dbClient.db('inventory');

    await db.collection('provinces').find({}).toArray((err, result) => {
        if (err) throw error;

        res.render('./registration/register', {
            provincesName: result
        });
    });
});

router.post('/', (req, res, next) => {


    res.render('./registration/response');
});

module.exports = router;
