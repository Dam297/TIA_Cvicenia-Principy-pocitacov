var express = require('express');
var { getStartedExerciseAttempt } = require('../../models/database');
var { getExerciseQuestion } = require('../../models/database');
var { startExerciseQuestion } = require('../../models/database');
var { endExerciseQuestion } = require('../../models/database');
var { setAnswerExerciseQuestion } = require('../../models/database');
var { getExerciseQuestionCorrectAnswer } = require('../../models/database');
var { checkAuthExerciseQuestion } = require('../../models/database');
var { checkAuthExerciseQuestionCorrectAnswer } = require('../../models/database');
var { generateExercise } = require('../../utils/generateExercise');


var router = express.Router();

router.get('/:id', async function (req, res, next) {
    if (req.session && req.session.userId) {
        try {
            const param = {};
            param["exercise_id"] = req.params.id;

            const resultExerciseAttemptId = await getStartedExerciseAttempt(param, req.session.userId);
            const exerciseAttemptId = resultExerciseAttemptId.rows[0]["exercise_attempt_id"];
            param["exercise_attempt_id"] = exerciseAttemptId;

            const first = await getExerciseQuestion(param);

            if (first.rows[0]["exercise_question_answer_id"] === null) {
                const concreteExercise = generateExercise(req.params.id);
                param["question"] = concreteExercise["question"];
                param["correct_answer"] = concreteExercise["correct_answer"];
                const some = await startExerciseQuestion(param);

                first.rows[0]["question"] = concreteExercise["question"];
                first.rows[0]["exercise_question_answer_id"] = some.rows[0]["exercise_question_answer_id"];
                first.rows[0]["count_actual"] = parseInt(first.rows[0]["count_actual"]) + 1;

                return res.status(200).json(first.rows);
            }

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
            const auth = await checkAuthExerciseQuestion(req.body, req.session.userId);
            // not authorization (bad id of answer on question)
            if (auth.rows.length == 0) {
                return res.status(401).end();
            }
            
            await endExerciseQuestion(req.body);
            const correct = (await getExerciseQuestionCorrectAnswer(req.body)).rows[0]["correct_answer"];
            req.body["correct"] = (correct === req.body["student_answer"]);
            await setAnswerExerciseQuestion(req.body);
            return res.status(200).end();

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

router.post('/correct-answer', async function (req, res, next) {
    if (req.session && req.session.userId) {
        try {
            const auth = await checkAuthExerciseQuestionCorrectAnswer(req.body, req.session.userId);
            // not authorization (bad id of answer on question or not finished question)
            if (auth.rows.length == 0) {
                return res.status(401).end();
            }

            const first = await getExerciseQuestionCorrectAnswer(req.body);

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