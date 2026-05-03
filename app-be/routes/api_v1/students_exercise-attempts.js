var express = require('express');
var { getStartedExerciseAttempt } = require('../../models/database');
var { getExerciseAttempt } = require('../../models/database');
var { newExerciseAttempt } = require('../../models/database');
var { endExercise } = require('../../models/database');
var { secondsRemaining }= require('../../utils/timeManager');
var router = express.Router();

router.get('/:id', async function (req, res, next) {
    if (req.session && req.session.userId) {
        try {
            const param = {};
            param["exercise_id"] = req.params.id;

            const resultExerciseAttemptId = await getStartedExerciseAttempt(param, req.session.userId);
            const exerciseAttemptId = resultExerciseAttemptId.rows[0]["exercise_attempt_id"];
            param["exercise_attempt_id"] = exerciseAttemptId;

            const first = await getExerciseAttempt(param);
        
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
            const startedExerciseAttempt = await getStartedExerciseAttempt(req.body, req.session.userId);
            if (startedExerciseAttempt.rows.length != 0) {
                return res.status(200).json(startedExerciseAttempt.rows);
            }

            // novy pokus
            await newExerciseAttempt(req.body,  req.session.userId);
            const startedExerciseAttempt2 = await getStartedExerciseAttempt(req.body, req.session.userId);
            return res.json(startedExerciseAttempt2.rows);

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
            const resultExerciseAttemptId = await getStartedExerciseAttempt(req.body, req.session.userId);
            const exerciseAttemptId = resultExerciseAttemptId.rows[0]["exercise_attempt_id"];
            req.body["exercise_attempt_id"] = exerciseAttemptId;

            const first = await endExercise(req.body);
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