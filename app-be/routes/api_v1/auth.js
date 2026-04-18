var express = require('express'); // ESM: import
var { getUsers } = require('../../models/database.js');
var { getUsersPassword } = require('../../models/database.js');
const { config } = require('../../config/config.js');
var { comparePassword, hashPassword } = require('../../utils/authHelpers.js');
var router = express.Router();


router.post("/login", async (req, res) => {
    const { username, password } = req.body;


       const oka = await hashPassword(password);
console.log(JSON.stringify(oka, null, 2));


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

module.exports = router;