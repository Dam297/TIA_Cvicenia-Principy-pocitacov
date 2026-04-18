var express = require('express');
var { getTests } = require('../../models/database');
var { getTestOptions } = require('../../models/database');
var router = express.Router();

router.get('/', function (req, res, next) {
    if (req.session && req.session.userId) {
        getTests().then(
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

router.get('/questions/options/:id', function (req, res, next) {
    if (req.session && req.session.userId) {
        getTestOptions(req.params.id).then(
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