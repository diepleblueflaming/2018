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
core.httpsServer = null;
core.layers = [];
const httpsServerOptions = {
	key: fs.readFileSync('./https/key.pem'),
	cert: fs.readFileSync('./https/cert.pem')
};


core.initialize = function ({https}) {
	core.httpServer = core.createHttpServer();
	core.httpsServer = typeof https === 'boolean' && https ? core.createHttpsServer() : null;
};


core.use = function ({path, handler, name}) {
	if(typeof handler !== 'function') {
		throw new Error('handler must be a function !');
	}
	const pathCopy = !path || path === '' ? null : trimSlash(path);
	core.layers.push({path: pathCopy, handler: handler, name});
};


core.processLayer = function (req, res) {
	const {trimmedPath} = core.parseURL(req, res);
	core.layers.reduce((acc, curr) =>
			acc.then((handlerName) =>
				new Promise((resolve, reject) => {
					const handlerNameFailed = handlerName && handlerName !== curr.name;
					const pathFailed = curr.path && !new RegExp(curr.path).test(trimmedPath);
					if (handlerNameFailed || pathFailed) {
						resolve(handlerName);
					} else {
						curr.handler(req, res, resolve);
					}
				})
			),
		Promise.resolve());
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

core.parseURL = function (req, res) {
	const parseURL = url.parse(req.url);
	const trimmedPath = trimSlash(parseURL.path);
	const httpMethod = req.method.toLowerCase();
	return {trimmedPath, httpMethod}
};
export default core;