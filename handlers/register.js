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

router.post('/', async (req, res, next) => {
    let objectKeys = Object.keys(req.body);

    if (check_fields(objectKeys, mandatoryPostData)) {
        console.log('With status.');

        res.status(302).render('./registration/response', {
            message: 'Successful!'
        });
    } else {
        // console.log('No status.');

        let db = req.app.locals.dbClient.db('inventory');

        await db.collection('provinces').find({}).toArray((err, result) => {
            if (err) throw error;

            res.render('./registration/register', {
                provincesName: result,
                postData: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    gender: req.body.gender,
                    address: req.body.address,
                    city: req.body.city,
                    province: req.body.province,
                    zipCode: req.body.zipCode,
                    email: req.body.email,
                }
            });
        });


    }

});

function check_values(reqBody, manPostData) {
    // manPostData.forEach(function(item) {
    //     if (!reqBody.includes(item)) {
    //         return false;
    //     }
    // });

    return false;
}

function check_fields(reqBody, manPostData) {

    if (reqBody.length !== manPostData.length) {
        return false;
    }

    return check_values(reqBody, manPostData);
}

module.exports = router;
