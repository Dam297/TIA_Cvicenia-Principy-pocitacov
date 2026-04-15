var express = require('express');
var { getStartedTestAttempt } = require('../../models/database')
var { newTestAttempt } = require('../../models/database')
var router = express.Router();

router.post('/', async function (req, res, next) {
    if (req.session && req.session.userId) {
        try {
            const startedTestAttempt = await getStartedTestAttempt(req.body, req.session.userId);
            if (startedTestAttempt.rows.length != 0) {

                return res.json(startedTestAttempt.rows);
            }

            // novy pokus
            await newTestAttempt(req.body,  req.session.userId);
            const startedTestAttempt2 = await getStartedTestAttempt(req.body, req.session.userId);
            return res.json(startedTestAttempt2.rows);

        } catch (err) {
            console.log(err);
            return res.status(500);
        };

    }
    // not authenticated
    else {
        res.status(401).end();
    }
    /*
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
        );*/
});

module.exports = router; 