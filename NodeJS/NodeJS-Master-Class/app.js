/*
* primary script
*
*
*/

// all dependencies
import {bodyParser} from './middlewares/bodyPaser';
import router from './router';
import responseParser from './middlewares/responseParser';
import config from './config';
import app from './core/core';
import LogRequest from './middlewares/log-request';
import Authentication from './middlewares/authentication';

app.initialize({https: true});

/******************** Define middleware ****************/
// log request
app.use({handler: LogRequest});

// body parser
app.use({handler: bodyParser});
// authentication middleware
app.use({
	path: '^(?!(login|register)).*$',
	handler: Authentication
});
// router
app.use({handler: router});


/***************** common handler *********************/
// Resource Not Found
app.use({
	handler: function (req, res, next) {
		res.body = {statusCode: 404, msg: 'Resource Not Found'};
		next('end-request');
	}
});

// send final response
app.use({handler: responseParser, name: 'end-request'});



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