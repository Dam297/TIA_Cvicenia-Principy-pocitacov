var express = require('express');
var { getTestQuestion } = require('../../models/database')
var { startTestQuestion } = require('../../models/database')
var { getStartedTestAttempt } = require('../../models/database')

var router = express.Router();

router.post('/', async function (req, res, next) {
    if (req.session && req.session.userId) {
        try {
            const resultTestAttemptId = await getStartedTestAttempt(req.body, req.session.userId);
            const testAttemptId = resultTestAttemptId.rows[0]["test_attempts_id"];
            req.body["test_attempt_id"] = testAttemptId;

            const first = await getTestQuestion(req.body);
            const row = first.rows[0];

            if (row["test_question_answer_id"] === null) {

                req.body["test_question_id"] = row["test_question_id"];
                const some = await startTestQuestion(req.body);

                first.rows[0]["test_question_answer_id"] = some.rows[0]["test_question_answer_id"];
                first.rows[0]["count_actual"] = parseInt(first.rows[0]["count_actual"]) + 1;

                return res.json(first.rows);
            }

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