var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const PgSession = require("connect-pg-simple")(session);
const { config } = require('./config/config.js');
var pool = require('./config/db.js');



var listRouter = require('./routes/api_v1/list')
var successRouter = require('./routes/api_v1/success')
var studentsRouter = require('./routes/api_v1/students')
var exercisesRouter = require('./routes/api_v1/exercises')
var testsRouter = require('./routes/api_v1/tests')
var bestTestAttemptRouter = require('./routes/api_v1/bestTestAttempt')
var bestExerciseAttemptRouter = require('./routes/api_v1/bestExerciseAttempt')
var testDescriptionRouter = require('./routes/api_v1/testDescription')
var exerciseDescriptionRouter = require('./routes/api_v1/exerciseDescription')
var insertNewTestAttemptRouter = require('./routes/api_v1/insertNewTestAttempt')
var getTestQuestionRouter = require('./routes/api_v1/getTestQuestion')
var getTestOptionsRouter = require('./routes/api_v1/getTestOptions')
var getTestAttemptRouter = require('./routes/api_v1/getTestAttempt')
var getFinalTestAttemptRouter = require('./routes/api_v1/getFinalTestAttempt')
var endTestQuestionRouter = require('./routes/api_v1/endTestQuestion')
var endTestRouter = require('./routes/api_v1/endTest')
var authRouter = require('./routes/api_v1/auth')


require('dotenv').config()

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());




if (process.env.STATUS === 'production') {
    // trust proxy needed for secure cookie to work on render.com
    // because render.com uses a reverse proxy to handle HTTPS requests
    // and forwards the requests to the backend server over HTTP
    app.set('trust proxy', 1);
    }

// express-session middleware - session can be accessed by req.session
app.use(
    session({
        store: new PgSession({ // store sessions in DB table      
            pool, 
            tableName: "session", 
            createTableIfMissing: true
        }),  
        secret: process.env.SESSION_SECRET, // Used to sign session ID cookie. Constant in .env file or generated e.g., crypto.randomBytes(64).toString('hex')
        resave: false, // don’t save the session to DB if it hasn’t been modified
        saveUninitialized: false, // prevents creating empty sessions
        name: config.session.cookieName,
        cookie: {
            secure: process.env.STATUS === 'production', // true - sent cookie only via HTTPS
            httpOnly: true, // browser JavaScript cannot access the cookie via document.cookie - protects sessionId from being stolen by malicious JS
            sameSite: process.env.STATUS === 'production'?'none':'lax', // none: cookies are sent on all (even cross-site) requests, secure must be set to true
                                                                        // lax: same-site requests + top-level safe navigation (GET)
                                                                        // strict: same-site requests only                                                                         
            maxAge: 1000 * 60 * 60 * 24 }            
             
    })    
);    
    
        

app.use('/api/v1/list', listRouter);
app.use('/api/v1/success', successRouter);
app.use('/api/v1/students', studentsRouter);
app.use('/api/v1/exercises', exercisesRouter);
app.use('/api/v1/tests', testsRouter);
app.use('/api/v1/best_test_attempt', bestTestAttemptRouter);
app.use('/api/v1/best_exercise_attempt', bestExerciseAttemptRouter);
app.use('/api/v1/test_description', testDescriptionRouter);
app.use('/api/v1/exercise_description', exerciseDescriptionRouter);
app.use('/api/v1/insert_new_test_attempt', insertNewTestAttemptRouter);
app.use('/api/v1/get_test_question', getTestQuestionRouter);
app.use('/api/v1/get_test_options', getTestOptionsRouter);
app.use('/api/v1/get_test_attempt', getTestAttemptRouter);
app.use('/api/v1/end_test_question', endTestQuestionRouter);
app.use('/api/v1/end_test', endTestRouter);
app.use('/api/v1/get_final_test_attempt', getFinalTestAttemptRouter);
app.use('/api/v1/auth', authRouter);





module.exports = app;
