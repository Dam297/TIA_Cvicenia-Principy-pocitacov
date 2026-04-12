var express = require('express');
var { getStartedTestAttempt } = require('../../models/database')
var { getTestAttempt } = require('../../models/database')

var router = express.Router();

router.post('/', async function (req, res, next) {
    try {
        const resultTestAttemptId = await getStartedTestAttempt(req.body);
        const testAttemptId = resultTestAttemptId.rows[0]["test_attempts_id"];
        req.body["test_attempt_id"] = testAttemptId;

        const first = await getTestAttempt(req.body);

        return res.json(first.rows);

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    };
});


module.exports = router; 