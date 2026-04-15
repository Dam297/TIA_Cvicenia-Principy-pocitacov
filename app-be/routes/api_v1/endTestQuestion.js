var express = require('express');
var { endTestQuestion } = require('../../models/database')
var { setAnswerTestQuestion } = require('../../models/database')
var { checkAuthTestQuestion } = require('../../models/database')


var router = express.Router();

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