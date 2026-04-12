var express = require('express');
var { getStartedTestAttempt } = require('../../models/database')
var { newTestAttempt } = require('../../models/database')
var router = express.Router();

router.post('/', function (req, res, next) {
    getStartedTestAttempt(req.body).then(
        (result) => {
            return result.rows;
        }
    )
        .then(
            (result) => {
                if (result.length === 0) {
                    return newTestAttempt(req.body).then(
                        getStartedTestAttempt(req.body).then(
                            (result) => {
                                res.json(result.rows);
                            }
                        )
                    ).catch(
                        (err) => {
                            console.log(err);
                            res.status(500);
                        }
                    );
                } else {
                    return res.json(result);
                }
            }
        )
        .catch(
            (err) => {
                console.log(err);
                res.status(500);
            }
        );
});

module.exports = router; 