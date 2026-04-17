var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const PgSession = require("connect-pg-simple")(session);
const { config } = require('./config/config.js');
var pool = require('./config/db.js');

var authRouter = require('./routes/api_v1/auth');
var exercisesRouter = require('./routes/api_v1/exercises');
var testsRouter = require('./routes/api_v1/tests');
var studentsRouter = require('./routes/api_v1/students');
var studentsExerciseAttemptsBestRouter = require('./routes/api_v1/students_exercise-attempts_best.js')
var studentsTestAttemptsRouter = require('./routes/api_v1/students_test-attempts.js');
var studentsTestAttemptsLastRouter = require('./routes/api_v1/students_test-attempts_last.js');
var studentsTestAttemptsBestRouter = require('./routes/api_v1/students_test-attempts_best.js');
var studentsTestAttemptsQuestionsRouter = require('./routes/api_v1/students_test-attempts_questions.js');


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
    
        
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/exercises', exercisesRouter);
app.use('/api/v1/tests', testsRouter);
app.use('/api/v1/students', studentsRouter);
app.use('/api/v1/students/exercise-attempts/best', studentsExerciseAttemptsBestRouter);
app.use('/api/v1/students/test-attempts', studentsTestAttemptsRouter);
app.use('/api/v1/students/test-attempts/last', studentsTestAttemptsLastRouter);
app.use('/api/v1/students/test-attempts/best', studentsTestAttemptsBestRouter);
app.use('/api/v1/students/test-attempts/questions', studentsTestAttemptsQuestionsRouter);

module.exports = app;
