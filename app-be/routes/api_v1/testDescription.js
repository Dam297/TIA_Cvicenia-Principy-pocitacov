var express = require('express'); 
var { getTestDescriptionUser } = require('../../models/database')
var router = express.Router();

router.post('/', function (req, res, next) {
    getTestDescriptionUser(req.body).then(
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