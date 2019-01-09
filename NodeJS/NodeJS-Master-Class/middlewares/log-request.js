"use strict";
/**
 * Project: NodeJS-Master-Class
 * Author: Le Hai Diep(dieple)
 * Date-Time: 09/01/2019-05:33
 */
import Log from '../lib/Log';
const colors = {
	'red': '\x1b[31m',
	'green': '\x1b[32m',
	'reset': '\x1b[0m',
	'underscore': '\x1b[4m',
	'blue': '\x1b[34m'
};
const LogRequest = {};
// all information need to log
LogRequest._startAt = 0;
LogRequest._endAt = 0;
LogRequest._method = '';
LogRequest._uri = '';
LogRequest._status = 0;
LogRequest._contentLength = '';
LogRequest._responseContent = '';

/**
 * initial LogRequest middleware
 * @param req
 * @param res
 * @param next
 */
LogRequest.init = function (req, res, next) {
	res.end = LogRequest.end(res, res.end, LogRequest.saveInformation);
	// save info
	LogRequest._startAt = new Date().getTime();
	LogRequest._method = req.method.toUpperCase();
	LogRequest._uri = req.url;
	next();
};

/**
 * handling when end request
 * @param res
 * @param resEnd
 * @param listener
 * @returns {Function}
 */
LogRequest.end = function (res, resEnd, listener) {
	return function () {
		const args = Array.from(arguments);
		listener(res);
		resEnd.call(this, args.pop());
	};
};

LogRequest.saveInformation = function (res) {
	LogRequest._responseContent = res.body;
	LogRequest._endAt = new Date().getTime();
	LogRequest._status = res.statusCode;

	// log to file
	LogRequest.logToFile();
	// log to console
	LogRequest.logToConsole();
};

/**
 * log request information to console
 */
LogRequest.logToConsole = function() {
	const requestTime = `${LogRequest._endAt - LogRequest._startAt}ms`;
	const log = [
		colors.blue, LogRequest._method + ' ',
		colors.reset, colors.underscore, LogRequest._uri,
		colors.reset, colors.green, ' ' + LogRequest._status,
		colors.reset, colors.red, ' ' + requestTime,
		colors.reset
	].join('');
	console.log(log);
};

/**
 * log request information to file
 */
LogRequest.logToFile = function () {
	const requestTime = `${LogRequest._endAt - LogRequest._startAt}ms`;
	const log = [
		LogRequest._method + ' ',
		LogRequest._uri + ' ',
		LogRequest._status + ' ',
		requestTime,
		'\n' + JSON.stringify(LogRequest._responseContent)
	].join('');
	Log.logFile(log);
};

export default LogRequest.init;