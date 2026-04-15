var express = require('express');
var { getSuccessExerciseTestUser } = require('../../models/database')
var router = express.Router();

router.get('/', function (req, res, next) {
    if (req.session && req.session.userId) {
        getSuccessExerciseTestUser(req.session.userId).then(
            (result) => {
                res.json(result.rows);
            }
        ).catch(
            (err) => {
                console.log(err);
                res.status(500);
            }
        );
    }
    // not authenticated
    else {
        res.status(401).end();
    }
});

module.exports = router; 