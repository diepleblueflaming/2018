"use strict";
/**
 * Project: NodeJS-Master-Class
 * Author: Le Hai Diep(dieple)
 * Date-Time: 21/11/2018-06:02
 */

import https from 'https';
import http from 'http';
import fs from "fs";
import url from 'url';
import {trimSlash} from "../utils";

const core = {};

core.httpServer = null;
core.httpServerProp = {};
core.httpsServer = null;
core.layers = [];
core.originalLayers = null;
const httpsServerOptions = {
	key: fs.readFileSync('./https/key.pem'),
	cert: fs.readFileSync('./https/cert.pem')
};


core.initialize = function ({https}) {
	core.httpServer = core.createHttpServer();
	core.httpsServer = typeof https === 'boolean' && https ? core.createHttpsServer() : null;
};


core.use = function ({path, handler, name}) {
	if (typeof handler !== 'function') {
		throw new Error('handler must be a function !');
	}
	const pathCopy = !path || path === '' ? null : trimSlash(path);
	// initial deferred
	core.layers.push({path: pathCopy, handler: handler, name});
};

core.run = function (req, res, middlewareIndex) {
	const {trimmedPath} = core.parseURL(req, res);
	return function (handlerName) {
		let nextMiddleware = core.layers[++middlewareIndex];
		if (handlerName) {
			// find matching middleware
			middlewareIndex = core.layers.findIndex((middleware) => middleware.name === handlerName);
			nextMiddleware = core.layers[middlewareIndex];
		}
		const unsatisfactoryPath = nextMiddleware.path && !new RegExp(nextMiddleware.path).test(trimmedPath);
		if (unsatisfactoryPath) {
			// pass control to next middleware
			nextMiddleware = core.layers[++middlewareIndex];
		}
		let handler = nextMiddleware ? nextMiddleware.handler : core.terminateServer;
		// ignore error function
		if (handler.length === 4) {
			handler = core.layers[++middlewareIndex] ? core.layers[middlewareIndex].handler : core.terminateServer;
		}
		// execute handler
		handler(req, res, core.run(req, res, middlewareIndex));
	};
};

core.handleError = function (req, res) {
	const index = core.layers.findIndex((middleware) => middleware.handler.length === 4);
	if(index > -1) {
		const errorHandler = core.layers[index];
		const next = core.layers[index] ? core.run(req, res, index) : core.terminateServer;
		const callback = errorHandler.handler;
		process.once('unhandledRejection', (err) => {
			callback(req, res, next, err);
		});
		process.once('uncaughtException', (err) => {
			callback(req, res, next, err);
		});
	}
};

core.processLayer = function (req, res) {
	const {trimmedPath} = core.parseURL(req, res);
	let count = 0;
	// add handle error
	core.handleError(req, res);
	// start process
	while (count < core.layers.length) {
		const middleware = core.layers[count];
		if(middleware.path && !new RegExp(middleware.path).test(trimmedPath)) {
			count ++;
			continue;
		}
		middleware.handler(req, res, core.run(req, res, count));
		break;
	}
};

core.createHttpServer = function () {
	return http.createServer((req, res) => {
		core.processLayer(req, res);
	});
};

core.createHttpsServer = function () {
	return https.createServer(httpsServerOptions, (req, res) => {
		core.processLayer(req, res);
	});
};

core.parseURL = function (req) {
	const parseURL = url.parse(req.url);
	const trimmedPath = trimSlash(parseURL.path);
	const httpMethod = req.method.toLowerCase();
	return {trimmedPath, httpMethod}
};

core.terminateServer = function () {
	console.log('Ca\'t find next middleware');
	process.exit(1);
};

export default core;