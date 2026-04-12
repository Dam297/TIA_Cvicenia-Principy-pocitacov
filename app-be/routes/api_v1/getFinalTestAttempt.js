var express = require('express');
var { getLastTestAttempt } = require('../../models/database')
var { getFinalTestAttempt } = require('../../models/database')

var router = express.Router();

router.post('/', async function (req, res, next) {
    try {
        const resultTestAttemptId = await getLastTestAttempt(req.body);
        const testAttemptId = resultTestAttemptId.rows[0]["test_attempts_id"];
        req.body["test_attempt_id"] = testAttemptId;

        const first = await getFinalTestAttempt(req.body);

        return res.json(first.rows);

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    };
});


module.exports = router; 