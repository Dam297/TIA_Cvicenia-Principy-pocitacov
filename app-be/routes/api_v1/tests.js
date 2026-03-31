var express = require('express'); 
var { getTests } = require('../../models/database')
var router = express.Router();

router.get('/', function (req, res, next) {
    getTests().then(
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