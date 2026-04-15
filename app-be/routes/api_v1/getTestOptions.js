var express = require('express');
var { getTestOptions } = require('../../models/database')
var router = express.Router();

router.post('/', function (req, res, next) {
    if (req.session && req.session.userId) {
        getTestOptions(req.body).then(
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