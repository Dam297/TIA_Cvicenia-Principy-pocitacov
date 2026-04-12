var express = require('express');
var { endTestQuestion } = require('../../models/database')
var { setAnswerTestQuestion } = require('../../models/database')

var router = express.Router();

router.post('/', async function (req, res, next) {
    endTestQuestion(req.body).then(
        (result) => {
            res.json(result.rows);
        }
    ).then(
    req.body.answered_options.forEach(element => {
        setAnswerTestQuestion(element, req.body.test_question_answer_id).then(
        /* to do something */
    )
    })
    ).catch(
        (err) => {
            console.log(err);
            res.status(500);
        }
    );

});

module.exports = router; 