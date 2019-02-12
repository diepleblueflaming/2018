/*
* primary script
*
*
*/

// all dependencies
import {bodyParser} from './middlewares/bodyPaser';
import router from './router/api';
import responseParser from './middlewares/responseParser';
import config from './config';
import app from './core/core';
import LogRequest from './middlewares/log-request';
import Authentication from './middlewares/authentication';
import Log from './lib/Log';

app.initialize({https: true});

/******************** Define middleware ****************/
// log request
app.use(LogRequest);

// body parser
app.use(bodyParser);
// authentication middleware
app.use(/^.*\/(?!(login|register)).*$/, Authentication);

// api router
app.use('/api', router);


// common handler
// Resource Not Found
app.use(function (req, res, next) {
		res.body = {statusCode: 404, msg: 'Resource Not Found'};
		next('end-request');
});

/******************** Error Handling ****************/
app.use(function (req, res, next, error) {
		const log = `Unhandled Rejection\n${error.stack}`;
		Log.logFile(log);
		res.body = {statusCode: 500, msg: 'Internal Server Error', data: null};
		next('end-request');
});
/******************** Error Handling ****************/

// send final response
app.use(responseParser, 'end-request');
/******************** Define middleware ****************/


/********************************** HTTP SERVER *********************************/
// Assign to http server a port and start the HTTP server
app.httpServer.listen(config.httpPort, function () {
	console.log(`HTTP Server is listening on port ${config.httpPort} and in ${config.envName} mode`);
});


/********************************** HTTPS SERVER *********************************/
// Assign to https Server a port and start the HTTPS Server
app.httpsServer.listen(config.httpsPort, function () {
	console.log(`HTTPS Server is listening on port ${config.httpsPort} and in ${config.envName} mode`);
});