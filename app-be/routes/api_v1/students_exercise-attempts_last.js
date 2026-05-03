var express = require('express');
var { getLastExerciseAttempt } = require('../../models/database');
var { getFinalExerciseAttempt } = require('../../models/database');
var router = express.Router();

router.post('/', async function (req, res, next) {
    if (req.session && req.session.userId) {
        try {
            const resultExerciseAttemptId = await getLastExerciseAttempt(req.body, req.session.userId);
            const exerciseAttemptId = resultExerciseAttemptId.rows[0]["exercise_attempt_id"];
            req.body["exercise_attempt_id"] = exerciseAttemptId;

            const first = await getFinalExerciseAttempt(req.body);
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


module.exports = router; 