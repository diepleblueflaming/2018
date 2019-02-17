"use strict";
/**
 * Project: NodeJS-Master-Class
 * Author: Le Hai Diep(dieple)
 * Date-Time: 13/02/2019-23:07
 */


/** End Define HTTP Client**/
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
			if (xhr.readyState === xhr.DONE && xhr.status === 200) {
				resolve(HttpClient.makeResponseObject(xhr));
			} else if (xhr.readyState === xhr.DONE) {
				reject(HttpClient.makeResponseObject(xhr));
			} else if (xhr.UNSENT) {
				reject({status: 0, 'message': 'Unable to sent request'});
			}
		};
	});
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
		})
	}
}

document.addEventListener("DOMContentLoaded", initApp);
/** Add Event **/