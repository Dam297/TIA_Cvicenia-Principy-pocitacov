var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var listRouter = require('./routes/api_v1/list')
var successRouter = require('./routes/api_v1/success')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/api/v1/list', listRouter);
app.use('/api/v1/success', successRouter);


module.exports = app;
