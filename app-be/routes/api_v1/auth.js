var express = require('express'); // ESM: import
var { getUsers } = require('../../models/database.js');
var { getUserRole } = require('../../models/database.js');
var { getUsersPassword } = require('../../models/database.js');
const { config } = require('../../config/config.js');
var { comparePassword, hashPassword } = require('../../utils/authHelpers.js');
var router = express.Router();


router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    getUsersPassword(username)
        .then((result) => {
            if (result.rows && result.rows.length === 1) {
                const userId = result.rows[0]["user_id"];
                const hashedPassword = result.rows[0].password;
             

                comparePassword(password, hashedPassword)
                    .then((isValid) => {
                        if (isValid) {
                            req.session.userId = userId;  // creates session
                            return res.status(200).end();
                        }
                        // invalid password
                        else {
                            console.log("Invalid password");
                            return res.status(401).end();
                        }
                    })
                    .catch((e) => {
                        console.log(e);
                        // internal server error
                        res.status(500).end();
                    })
            }
            // user does not exist
            else {
                console.log("User does not exist");
                return res.status(401).end();
            }
        })
        .catch((e) => {
            console.log(e);
            return res.status(500).end();
        })
});

router.delete("/logout", (req, res) => {
    if (req.session && req.session.userId) {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
                return res.status(500).end();  // internal server error
            } else {
                // clear the cookie in the browser
                res.clearCookie(config.session.cookieName);
                return res.status(200).end();  // successful logout
            }
        });
    } else {
        return res.status(400).end();  // bad request - session doesn't exist
    }
});


router.get('/user-role', function (req, res, next) {
    if (req.session && req.session.userId) {
        getUserRole(req.session.userId).then(
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