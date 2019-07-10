var express = require('express');
var router = express.Router();

router.get('/', async (req, res, next) => {
    let db = req.app.locals.dbClient.db('inventory');

    await db.collection('provinces').find({}).toArray((err, result) => {
        if (err) throw error;

        res.render('./registration/register', {
            provincesName: result,
            postData: {}
        });
    });
});

let mandatoryPostData = ['firstName', 'lastName', 'gender', 'address', 'city', 'province', 'zipCode', 'email', 'password', 'confirmPassword'];

router.post('/', (req, res, next) => {
    let objectKeys = Object.keys(req.body);

    if (check_fields(objectKeys, mandatoryPostData)) {
        res.status(302).render('./registration/response', {
            postData: {}
        });
    } else {
        res.render('./registration/register', {
            postData: {}
        });
    }

});

function check_values(reqBody, manPostData) {
    manPostData.forEach(function(item) {
        if (!reqBody.includes(item)) {
            return false;
        }
    });

    return true;
}

function check_fields(reqBody, manPostData) {
    // return false;

    // somewhere error

    if (reqBody.length !== postData.length) {
        return false;
    }

    return check_values(reqBody, manPostData);
}

module.exports = router;
