"use strict";
/**
 * Project: NodeJS-Master-Class
 * Author: Le Hai Diep(dieple)
 * Date-Time: 22/11/2018-05:36
 */
import {trimSlash} from "../utils";
import url from "url";

const ParamRegex = /^:(\w+)(\(.+\))?$/;

const router = {};

router.layers = [];

router.Router = function (req, res, next) {
	const realURL = router.parseURL(req, res);
	const route = router.layers.find((r) => r.regex.test(realURL));
	if(route) {
		req.params = router.detectParams(realURL, route.path);
		route.handler(req, res, next);
	}else {
		next();
	}
};

router.use = function ({path, handler}) {
	const pathCopy = path === '' || path === '*' ? '*' : trimSlash(path);
	const handlerCopy = typeof handler === 'function' ? handler : function(){};
	router.layers.push({path: pathCopy, handler: handlerCopy});
};


router.get = function () {
	const {path, handler, regex} = router.parseParams(arguments, 'GET');
	router.layers.push({path, handler, regex});
};

router.post = function () {
	const {path, handler, regex} = router.parseParams(arguments, 'POST');
	router.layers.push({path, handler, regex});
};

router.put = function () {
	const {path, handler,regex} = router.parseParams(arguments, 'PUT');
	router.layers.push({path, handler, regex});
};

router.delete = function () {
	const {path, handler, regex} = router.parseParams(arguments, 'DELETE');
	router.layers.push({path, handler, regex});
};

router.all = function () {
	const {path, handler, regex} = router.parseParams(arguments, '(\\w*)');
	router.layers.push({path, handler, regex});
};

router.parseParams = function(args, httpMethod) {
	const params = Array.from(args);
	const path = params.length === 2 && typeof params[0] === 'string' && params[0] ? params[0] : '';
	const regex = params.length === 2 && typeof params[0] === 'string' && params[0] ?
							 router.parserRoute(params[0], httpMethod) : /^(.*)$/;
	const handler = (params.length === 1 && typeof params[0] === 'function') ||
									(params.length === 2 && typeof params[1] === 'function') ?
									(params[1] || params[0]) : null;
	if(!handler) {
		throw new Error('Handler must be a function !');
	}
	return {path, regex, handler};
};

router.parseURL = function (req, res) {
	const parseURL = url.parse(req.url);
	const trimmedPath = trimSlash(parseURL.path);
	const httpMethod = req.method.toLowerCase();
	return `${httpMethod.toUpperCase()}/${trimmedPath}`;
};

router.parserRoute = function (route, httpMethod) {
	const trimmedRoute = trimSlash(route);
	const arrRoute = trimmedRoute.split('/');
	const arrRouteTransformed = arrRoute.map((piece) => {
		const arrMatch = piece.match(ParamRegex);
		return arrMatch && Array.isArray(arrMatch)  ? (arrMatch[2] || '(.+)') : piece;
	});
	const strRoute = arrRouteTransformed.join('/');
	const strTmp = `^${httpMethod}/${strRoute}$`;
	return new RegExp(strTmp);
};


router.detectParams = function (realURL, route) {
	const params = {};
	const arrRealURL = realURL.split('/');
	const arrRoute = route.split('/');

	arrRoute.forEach((piece, index) => {
		const arrMatch = piece.match(ParamRegex);
		if(arrMatch && Array.isArray(arrMatch)) {
			const paramName = arrMatch[1];
			params[paramName] = arrRealURL[index];
		}
	});
	return params;
};

export default router;