"use strict";
/**
 * Project: NodeJS-Master-Class
 * Author: Le Hai Diep(dieple)
 * Date-Time: 21/11/2018-06:02
 */

import https from 'https';
import http from 'http';
import fs from "fs";
import Route from './route';
import {isRegex, trimSlash} from "../utils";

const core = new Route();
const ParamRegex = /^:(\w+)(\(.+\))?$/;

core.httpServer = null;
core.httpsServer = null;

const httpsServerOptions = {
	key: fs.readFileSync('./https/key.pem'),
	cert: fs.readFileSync('./https/cert.pem')
};

core.initialize = function ({https}) {
	core.httpServer = core.createHttpServer();
	core.httpsServer = typeof https === 'boolean' && https ? core.createHttpsServer() : null;
};

core.run = function (req, res, middlewareIndex) {
	const userPath = Route.parseURL(req, res);
	return function (handlerName) {
		// solution 2
		const layer = core.findRunFunction(core.layers, userPath, handlerName, middlewareIndex);
		// detect params
		if(layer) {
			req.params = core.detectParams(userPath, layer.path.toString());
		}
		const runFnc = layer ? layer.handler : core.terminateServer;

		const currentLayerPosition = core.layers.indexOf(layer);
		runFnc(req, res, core.run(req, res, currentLayerPosition + 1));

		/*	// solution 1
			let currentMiddleware = core.layers[middlewareIndex];
			// let nextMiddleware = core.layers[++middlewareIndex];
			if (handlerName) {
				// find matching middleware
				middlewareIndex = core.layers.findIndex((middleware) => middleware.name === handlerName);
				currentMiddleware = core.layers[middlewareIndex];
			}
			const unsatisfactoryPath = nextMiddleware.path && !new RegExp(nextMiddleware.regex).test(userPath);
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
			handler(req, res, core.run(req, res, middlewareIndex));*/
	};
};

core.handleError = function (req, res) {
	const index = core.layers.findIndex((middleware) => middleware.handler.length === 4);
	if (index > -1) {
		const errorHandler = core.layers[index];
		const next = core.layers[index] ? core.run(req, res, index + 1) : core.terminateServer;
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
	// add handle error
	core.handleError(req, res);
	// convert path from string to  regex
	core.layers = core.convertPath(core.layers);
	// start process
	core.run(req, res, 0)();
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

core.terminateServer = function () {
	console.log('Ca\'t find next middleware');
	process.exit(1);
};

core.findRunFunction = function (layers, userPath, handlerName, middlewareIndex) {
	let result = null;
	let i = middlewareIndex;
	for (i; i < layers.length; i++) {
		if (
			// match user path
			(layers[i].regex.test(userPath)) &&
			// math provided handle name
			(!handlerName || layers[i].name === handlerName) &&
			// ignore handle error function
			(layers[i].handler.length !== 4)
		) {
			return layers[i];
		}
		/*	if (Array.isArray(layers[i].handler) && (layers[i].regex.test(userPath))) {
				result = core.findRunFunction(layers[i].handler, userPath, handlerName, options);
			}*/
	}
	return result;
};

core.convertStringToRegex = function (route, httpMethod) {
	const trimmedRoute = trimSlash(route);
	const arrRoute = trimmedRoute.split('/');
	const arrRouteTransformed = arrRoute.map((piece) => {
		const arrMatch = piece.match(ParamRegex);
		return arrMatch && Array.isArray(arrMatch) ? (arrMatch[2] || '(.+)') : piece;
	});
	const strRoute = arrRouteTransformed.join('/');
	const strTmp = `^${httpMethod}/${strRoute}$`;
	return new RegExp(strTmp);
};

core.convertPath = function (layers) {
	return layers.map(layer => {
		layer.regex = isRegex(layer.path) ? core.addHTTPMethodPrefix(layer.path, layer.httpMethod) :
									core.convertStringToRegex(layer.path, layer.httpMethod);
		return layer;
	});
};

core.detectParams = function(realURL, route) {
	const params = {};
	const arrRealURL = realURL.split('/');
	const arrRoute = route.split('/');

	arrRoute.forEach((piece, index) => {
		const arrMatch = piece.match(ParamRegex);
		if (arrMatch && Array.isArray(arrMatch)) {
			const paramName = arrMatch[1];
			params[paramName] = arrRealURL[index];
		}
	});
	return params;
};

core.addHTTPMethodPrefix = function (route, httpMethod) {
	if(httpMethod) {
		const replaced = trimSlash(String(route).replace('^', `^${httpMethod.toUpperCase()}\\\/`));
		return new RegExp(replaced);
	}
	return route;
};

export default core;