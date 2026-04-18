var express = require('express');
var { getStudents } = require('../../models/database');
var { getListExerciseTestUser } = require('../../models/database');
var { getSuccessExerciseTestUser } = require('../../models/database');
var { checkAuthTeacher } = require('../../models/database');
var router = express.Router();

router.get('/', async function (req, res, next) {
    if (req.session && req.session.userId) {
        try {
            const auth = await checkAuthTeacher(req.session.userId);
            // not authorization (user si not teacher)
            if (auth.rows.length == 0) {
                return res.status(401).end();
            }

            const students = await getStudents();
            return res.status(200).json(students.rows);

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

router.get('/success-rates', function (req, res, next) {
    if (req.session && req.session.userId) {
        getListExerciseTestUser(req.session.userId).then(
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

router.get('/success-rates/specific-student', function (req, res, next) {
    if (req.session && req.session.userId) {
        getSuccessExerciseTestUser(req.session.userId).then(
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