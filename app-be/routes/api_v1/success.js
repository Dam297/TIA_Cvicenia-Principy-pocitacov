var express = require('express'); 
var { getSuccessExerciseTestUser } = require('../../models/database')
var router = express.Router();

router.get('/', function (req, res, next) {
    getSuccessExerciseTestUser().then(
        (result) => {
            res.json(result.rows);
        }
    ).catch(
        (err) => {
            console.log(err);
            res.status(500);
        }
    );
});

module.exports = router; 