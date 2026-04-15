var express = require('express');
var { getStudents } = require('../../models/database')
var { checkAuthTeacher } = require('../../models/database')
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
            return res.json(students.rows);

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