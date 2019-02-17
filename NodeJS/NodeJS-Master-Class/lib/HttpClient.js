"use strict";
/**
 * Project: NodeJS-Master-Class
 * Author: Le Hai Diep(dieple)
 * Date-Time: 14/02/2019-20:44
 */

const HttpClient = {};

HttpClient.get = function (url, options) {

	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();

		const headers = options.headers || {};

		// set headers for request
		this.setHeaders(xhr, headers);

		// initial request
		xhr.open('GET', url, true);

		// send request
		xhr.send();

		xhr.onreadystatechange = function () {
			if(xhr.readyState === xhr.DONE && xhr.status === 200) {
				resolve(HttpClient.makeResponseObject(xhr));
			}else if(xhr.readyState === xhr.DONE){
				reject(HttpClient.makeResponseObject(xhr));
			}else {
				reject({status: 0, 'message': 'Unable to sent request'});
			}
		};
	});
};


HttpClient.setHeaders = function (xhr, headers) {
	for(let headerKey in headers) {
		if (headers.hasOwnProperty(headerKey)) {
			xhr.setRequestHeader(headerKey, headers[headerKey]);
		}
	}
};

HttpClient.makeResponseObject = function (xhr) {
	return {
		status: xhr.status,
		header: xhr.getAllResponseHeaders(),
		data: xhr.response
	};
};

HttpClient.convertStringHeaderToObject = function (stringHeader) {
	const header = {};
	const arrayHeader = stringHeader.split('↵');
	arrayHeader.forEach(part => {
		const array = part.split(':');
		if(Array.isArray(array)) {
			const key = array[0].trim();
			const value = array[1].trim();
			header[key] = value;
		}
	});
	return header;
};

export default HttpClient;