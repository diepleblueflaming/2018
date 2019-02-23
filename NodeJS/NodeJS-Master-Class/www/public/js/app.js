"use strict";
/**
 * Project: NodeJS-Master-Class
 * Author: Le Hai Diep(dieple)
 * Date-Time: 13/02/2019-23:07
 */


/** End Define HTTP Client**/
const HttpClient = {};

HttpClient.get = function (url, options = {}) {

	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();

		const headers = options.headers || {};
		const queryObject = options.queries || {};

		if(Object.keys(queryObject) > 0) {
			url += `?${HttpClient.parseQueryObject(queryObject)}`;
		}

		// initial request
		xhr.open('GET', url, true);

		// set headers for request
		this.setHeaders(xhr, headers);

		// send request
		xhr.send();

		xhr.onreadystatechange = function () {
			HttpClient.onStateChange(xhr, resolve, reject);
		};
	});
};


HttpClient.delete = function (url, options = {}) {

	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();

		const headers = options.headers || {};
		const queryObject = options.queries || {};

		if(Object.keys(queryObject) > 0) {
			url += `?${HttpClient.parseQueryObject(queryObject)}`;
		}

		// initial request
		xhr.open('DELETE', url, true);

		// set headers for request
		this.setHeaders(xhr, headers);

		// send request
		xhr.send();

		xhr.onreadystatechange = function () {
			HttpClient.onStateChange(xhr, resolve, reject);
		};
	});
};


HttpClient.put = function (url, options = {}) {

	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();

		const headers = options.headers || {};
		const queryObject = options.queries || {};
		const data = options.data || {};

		if(Object.keys(queryObject) > 0) {
			url += `?${HttpClient.parseQueryObject(queryObject)}`;
		}

		// initial request
		xhr.open('PUT', url, true);

		// set headers for request
		this.setHeaders(xhr, headers);

		// send request
		xhr.send(data);

		xhr.onreadystatechange = function () {
			HttpClient.onStateChange(xhr, resolve, reject);
		};
	});
};

HttpClient.onStateChange = function(xhr, resolve, reject) {
	if (xhr.readyState === xhr.DONE && xhr.status === 200) {
		resolve(HttpClient.makeResponseObject(xhr));
	} else if (xhr.readyState === xhr.DONE) {
		reject(HttpClient.makeResponseObject(xhr));
	} else if (xhr.UNSENT) {
		reject({status: 0, 'message': 'Unable to sent request'});
	}
};


HttpClient.setHeaders = function (xhr, headers) {
	for (let headerKey in headers) {
		if (headers.hasOwnProperty(headerKey)) {
			xhr.setRequestHeader(headerKey, headers[headerKey]);
		}
	}
};

HttpClient.makeResponseObject = function (xhr) {
	return {
		status: xhr.status,
		header: this.convertStringHeaderToObject(xhr.getAllResponseHeaders()),
		data: xhr.response
	};
};

HttpClient.convertStringHeaderToObject = function (stringHeader) {
	const header = {};
	const arrayHeader = stringHeader.split('\r\n');
	arrayHeader.pop(); // remove empty value
	arrayHeader.forEach(part => {
		const array = part.split(':');
		if (Array.isArray(array)) {
			const key = array[0].trim();
			const value = array[1].trim();
			header[key] = value;
		}
	});
	return header;
};

Headers.parseQueryObject = function(object) {
	let queryString = '';
	if (Object.prototype.toString.call(object) === '[object Object]') {
		for(let key in object) {
			if (object.hasOwnProperty(key)) {
				queryString += queryString ? '&' : '';
				queryString += `${key.toLowerCase()}=${String(object[key]).toLowerCase()}`;
			}
		}
	}
	return queryString;
};
/** End Define HTTP Client**/

const BASE_URL = 'http://localhost:3000';
const defaultHeader = {
	'Content-Type': 'application/json'
};
const User = {};

User.getUsers = async function () {
	const url = `${BASE_URL}/api/user/`;
	const response = await HttpClient.get(url, defaultHeader);
	const stringUser = response.data;
	return parseJson(stringUser);
};

User.delete = function(userId) {
	const url = `${BASE_URL}/api/user/${userId}`;
	return HttpClient.delete(url);
};

User.update = function(userInfo) {
	const url = `${BASE_URL}/api/user`;
	const options = {
		headers: {
			'Content-Type': 'application/json'
		},
		data: JSON.stringify(userInfo)
	};
	return HttpClient.put(url, options);
};

function parseJson(json) {
	try {
		const object = JSON.parse(json);
		return object;
	} catch (e) {
		return null;
	}
}

/** Add Event **/
function initApp() {
	const loginBtn = document.getElementById('login-btn');
	if(loginBtn) {
		loginBtn.addEventListener('click', function () {
			window.location.href = `${BASE_URL}/login`;
		});
	}
}

document.addEventListener("DOMContentLoaded", initApp);
/** Add Event **/