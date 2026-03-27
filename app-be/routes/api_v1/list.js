var express = require('express'); 
var { getListExerciseTestUser } = require('../../models/database')
var router = express.Router();

router.get('/', function (req, res, next) {
    getListExerciseTestUser().then(
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