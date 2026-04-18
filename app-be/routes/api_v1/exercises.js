var express = require('express');
var { getExercises } = require('../../models/database');
var router = express.Router();

router.get('/', function (req, res, next) {
    if (req.session && req.session.userId) {
        getExercises().then(
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