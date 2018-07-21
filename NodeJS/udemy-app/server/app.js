const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// each request create a new express instance and we store it into app const.
const app = express();
// require errorHandler
const errorHandler = require('middlewares/errorHandler/');
const sendResponse = require('middlewares/common/sendResponse');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// setting response header
app.all(require('middlewares/common/configHeader'));
// set db global variable to this app instance
require('models/connector');
// pass app instance to routers
require('routes/v1/')(express, app);

// middleware send response to user
app.use(sendResponse);
// catch 404 and forward to error handler
app.use(errorHandler.notFound.bind(errorHandler));
// error handler
app.use(errorHandler.common.bind(errorHandler));

module.exports = app;
