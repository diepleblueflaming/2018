/*
* primary script
*
*
*/

// all dependencies
import {bodyParser} from './middlewares/bodyPaser';
import ApiRouter from './router/api';
import WebRouter from './www/router';
import config from './config';
import app from './core/core';
import LogRequest from './middlewares/log-request';
import Authentication from './middlewares/authentication';
import ServingStatic from './middlewares/servingStatic';

app.initialize({https: true});

/******************** Define middleware ****************/
// log request
app.use(LogRequest);

// body parser
app.use(bodyParser);
// authentication middleware
app.use(/^.*\/(?!(login|register)).*$/, Authentication);


// serving static resource
app.get(/^public\/(\w+\/)*([\w\d_-]+\.\w{2,4})$/, ServingStatic);

// routes
app.use('/api', ApiRouter);
app.use('/', WebRouter);


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