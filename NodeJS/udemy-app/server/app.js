const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// each request create a new express instance and we store it into app const.
const app = express();

// load app config
dotenv.config({
	path: `./server/config/${process.env.NODE_ENV}/.env`,
	encoding: 'utf8'
});

// require errorHandler
const {handleError, handleResourceNotFound} = require('middlewares/errorHandler/');
const sendResponse = require('middlewares/common/sendResponse');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// setting response header
app.all(require('middlewares/common/configHeader'));

// connect to mongodb
require('models/connector');

// pass app instance to routers
app.use(require('routes/v1/'));

// middleware send response to user
app.use(sendResponse);

// catch 404 and forward to error handler
app.use(handleResourceNotFound);

// error handler
app.use(handleError);

module.exports = app;
