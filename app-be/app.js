var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var listRouter = require('./routes/api_v1/list')
var successRouter = require('./routes/api_v1/success')
var studentsRouter = require('./routes/api_v1/students')
var exercisesRouter = require('./routes/api_v1/exercises')
var testsRouter = require('./routes/api_v1/tests')
var bestTestAttemptRouter = require('./routes/api_v1/bestTestAttempt')
var bestExerciseAttemptRouter = require('./routes/api_v1/bestExerciseAttempt')




var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/api/v1/list', listRouter);
app.use('/api/v1/success', successRouter);
app.use('/api/v1/students', studentsRouter);
app.use('/api/v1/exercises', exercisesRouter);
app.use('/api/v1/tests', testsRouter);
app.use('/api/v1/best_test_attempt', bestTestAttemptRouter);
app.use('/api/v1/best_exercise_attempt', bestExerciseAttemptRouter);


module.exports = app;
