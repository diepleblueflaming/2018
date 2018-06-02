const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// each request create a new express instance and we store it into app const.
const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// set db global variable to this app instance
require('models/connector');
// pass app instance to routers
require('routes/v1/index')(express, app);
;

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    let errMsg = req.app.get('env') === 'development' ? err.name + ': ' + err.message : {};
    res.status(err.status || 500);
    res.end(errMsg);
});

module.exports = app;
