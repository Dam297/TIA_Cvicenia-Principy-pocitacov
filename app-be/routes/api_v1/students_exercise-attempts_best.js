var express = require('express');
var { getBestExerciseAttempt } = require('../../models/database');
var { getExerciseDescriptionUser } = require('../../models/database');
var { checkAuthTeacher } = require('../../models/database');
var router = express.Router();

router.post('/', async function (req, res, next) {
     if (req.session && req.session.userId) {
            /* user wants own data */
            if (req.body["user_id"] === undefined) {
                getBestExerciseAttempt(req.body, req.session.userId).then(
                    (result) => {
                        res.status(200).json(result.rows);
                    }
                ).catch(
                    (err) => {
                        console.log(err);
                        res.status(500).end();
                    }
                );
            }
            /* user wants data from another user */
            else {
                try {
                    const auth = await checkAuthTeacher(req.session.userId);
                    // not authorization (user isnot teacher)
                    if (auth.rows.length == 0) {
                        return res.status(401).end();
                    }
    
                    const bestExerciseAttempt = await getBestExerciseAttempt(req.body, req.body["user_id"]); 
                    return res.status(200).json(bestExerciseAttempt.rows);
    
                } catch (err) {
                    console.log(err);
                    return res.status(500).end();
                };
            }
        }
        // not authenticated
        else {
            res.status(401).end();
        }
});

router.post('/description', function (req, res, next) {
    if (req.session && req.session.userId) {
        getExerciseDescriptionUser(req.body, req.session.userId).then(
            (result) => {
                res.status(200).json(result.rows);
            }
        ).catch(
            (err) => {
                console.log(err);
                res.status(500).end();
            }
        );
    }
    // not authenticated
    else {
        res.status(401).end();
    }

});


module.exports = router; 