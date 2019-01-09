"use strict";
/**
 * Project: NodeJS-Master-Class
 * Author: Le Hai Diep(dieple)
 * Date-Time: 06/01/2019-18:12
 */
import https from 'https';

const Request = {};
const defaultOptions = {
	'Content-Type': 'application/json'
};

Request.get = function (url, options) {
	const promiseResponse = {
		data: null,
		error: null,
		statusCode: null,
		headers: null
	};
	return new Promise((resolve, reject) => {
		options = typeof options === 'object' ? options : defaultOptions;

		if (typeof url !== 'string' || !url.trim().length) {
			reject(new Error(Request.createErrorMessage('invalid url argument', 'GET')));
		}
		// send request
		https.get(url, options, (response) => {
			// Request.createRequestLog(url, 'GET');
			const {statusCode, headers} = response;
			const contentType = headers['content-type'];

			promiseResponse.statusCode = statusCode;
			promiseResponse.headers = headers;

			if (statusCode !== 200) {
				// free up memory
				response.resume();
				reject(promiseResponse);
			}

			// read raw data form response
			response.setEncoding('utf8');
			let rawData = '';
			response.on('data', chunk => rawData += chunk);
			response.on('end', () => {
				promiseResponse.data = Request.handleRawData(rawData, contentType);
				resolve(promiseResponse);
			});
		}).on('error', (error) => {
			promiseResponse.error = error;
			reject(promiseResponse);
		});
	});
};


/**
 * create Request Module error message
 * @param message
 * @param method // method occurred error
 */
Request.createErrorMessage = function (message, method) {
	return `[Request Module]: ${message} in ${method.toUpperCase()} method`;
};


Request.createRequestLog = function (url, method) {
	const log = `[Request Module]: ${method.toUpperCase()}/ ${url}`;
	console.log(log);
};

/**
 * Handling convert raw data by content type
 * @param rawData
 * @param contentType
 * @returns {*}
 */
Request.handleRawData = function (rawData, contentType) {
	let realData = null;
	if (/^application\/json/.test(contentType)) {
		try {
			realData = JSON.parse(rawData);
		} catch (e) {
			realData = null;
		}
	}
	return realData;
};

export default Request;