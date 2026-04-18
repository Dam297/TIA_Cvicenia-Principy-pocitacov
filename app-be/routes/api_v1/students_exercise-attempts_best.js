var express = require('express');
var { getBestExerciseAttempt } = require('../../models/database');
var { getExerciseDescriptionUser } = require('../../models/database');
var router = express.Router();

router.post('/', function (req, res, next) {
    if (req.session && req.session.userId) {
        getBestExerciseAttempt(req.body, req.session.userId).then(
            (result) => {
                res.status(200).json(result.rows);
            }
        ).catch(
            (err) => {
                console.log(err);
                res.status(500).end();
            }
        );
    }
    // not authenticated
    else {
        res.status(401).end();
    }
});

router.post('/description', function (req, res, next) {
    if (req.session && req.session.userId) {
        getExerciseDescriptionUser(req.body, req.session.userId).then(
            (result) => {
                res.status(200).json(result.rows);
            }
        ).catch(
            (err) => {
                console.log(err);
                res.status(500).end();
            }
        );
    }
    // not authenticated
    else {
        res.status(401).end();
    }

});


module.exports = router; 