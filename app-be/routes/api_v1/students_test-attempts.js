var express = require('express');
var { getStartedTestAttempt } = require('../../models/database');
var { getTestAttempt } = require('../../models/database');
var { newTestAttempt } = require('../../models/database');
var { endTest } = require('../../models/database');
var { secondsRemaining }= require('../../utils/timeManager');
var router = express.Router();

router.get('/:id', async function (req, res, next) {
    if (req.session && req.session.userId) {
        try {
            const param = {};
            param["test_id"] = req.params.id;

            const resultTestAttemptId = await getStartedTestAttempt(param, req.session.userId);
            const testAttemptId = resultTestAttemptId.rows[0]["test_attempts_id"];
            param["test_attempt_id"] = testAttemptId;

            const first = await getTestAttempt(param);
        
            first.rows[0]["remaining_seconds"] = secondsRemaining(first.rows[0]["start"], first.rows[0]["max_time_s"])
            
            return res.status(200).json(first.rows);

        } catch (err) {
            console.log(err);
            return res.status(500).end();
        };
    }
    // not authenticated
    else {
        res.status(401).end();
    }
});

router.post('/', async function (req, res, next) {
    if (req.session && req.session.userId) {
        try {
            const startedTestAttempt = await getStartedTestAttempt(req.body, req.session.userId);
            if (startedTestAttempt.rows.length != 0) {
                return res.status(200).json(startedTestAttempt.rows);
            }

            // novy pokus
            await newTestAttempt(req.body,  req.session.userId);
            const startedTestAttempt2 = await getStartedTestAttempt(req.body, req.session.userId);
            return res.json(startedTestAttempt2.rows);

        } catch (err) {
            console.log(err);
            return res.status(500).end();
        };

    }
    // not authenticated
    else {
        res.status(401).end();
    }
});

router.put('/', async function (req, res, next) {
    if (req.session && req.session.userId) {
        try {
            const resultTestAttemptId = await getStartedTestAttempt(req.body, req.session.userId);
            const testAttemptId = resultTestAttemptId.rows[0]["test_attempts_id"];
            req.body["test_attempt_id"] = testAttemptId;

            const first = await endTest(req.body);
            return res.json(first.rows);

        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal server error" });
        };
    }
    // not authenticated
    else {
        res.status(401).end();
    }
});


module.exports = router; 