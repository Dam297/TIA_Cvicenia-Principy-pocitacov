var express = require('express');
var { getStartedTestAttempt } = require('../../models/database');
var { getTestQuestion } = require('../../models/database');
var { startTestQuestion } = require('../../models/database');
var { endTestQuestion } = require('../../models/database');
var { setAnswerTestQuestion } = require('../../models/database');
var { checkAuthTestQuestion } = require('../../models/database');

var router = express.Router();

router.get('/:id', async function (req, res, next) {
    if (req.session && req.session.userId) {
        try {
            const param = {};
            param["test_id"] = req.params.id;

            const resultTestAttemptId = await getStartedTestAttempt(param, req.session.userId);
            const testAttemptId = resultTestAttemptId.rows[0]["test_attempts_id"];
            param["test_attempt_id"] = testAttemptId;

            const first = await getTestQuestion(param);
            const row = first.rows[0];

            if (row["test_question_answer_id"] === null) {

                param["test_question_id"] = row["test_question_id"];
                const some = await startTestQuestion(param);

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

router.post('/', async function (req, res, next) {
    if (req.session && req.session.userId) {
        try {
            const auth = await checkAuthTestQuestion(req.body, req.session.userId);
            // not authorization (bad id of answer on question)
            if(auth.rows.length == 0){
              return res.status(401).end();
            }

            await endTestQuestion(req.body);
            req.body.answered_options.forEach(element => {
                setAnswerTestQuestion(element, req.body.test_question_answer_id);
            })
            return res.status(200).end();

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