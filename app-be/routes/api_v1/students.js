var express = require('express'); 
var { getStudents } = require('../../models/database')
var router = express.Router();

router.get('/', function (req, res, next) {
    getStudents().then(
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