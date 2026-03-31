var express = require('express'); 
var { getExercises } = require('../../models/database')
var router = express.Router();

router.get('/', function (req, res, next) {
    getExercises().then(
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