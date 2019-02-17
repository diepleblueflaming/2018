"use strict";
/**
 * Project: NodeJS-Master-Class
 * Author: Le Hai Diep(dieple)
 * Date-Time: 21/11/2018-06:13
 */
import crypto from 'crypto';
import FileHelper from '../lib/FileHelper';

const TOKEN_LENGTH = 20;
const BASE_WWW_DIR = 'www';
export const validateParams = function (spec) {

};

/**
 * remove all slashes at the end and start of string
 * @param string
 * @returns {string}
 */
export const trimSlash = function (string) {
	return string.replace(/^\/+|\/+$/g, '').toLowerCase();
};

/**
 * generate random string
 * @returns {string}
 */
export const generateToken = function(tokenLength = TOKEN_LENGTH) {
	return String(crypto.randomBytes(20).toString('hex').slice(0, tokenLength));
};

/**
 * check if token is valid
 * @param token
 * @returns {boolean}
 */
export const isValidToken = function (token) {
	return typeof token === 'string' && token.length === TOKEN_LENGTH;
};

export const deleteProperty = function (object, key) {
	return Object.keys(object).
	reduce((obj, currentKey) => {
		if(key !== currentKey) {
			obj[currentKey] = object[currentKey];
		}
		return obj;
	}, {});
};

export const getLogFileNameByDate = function () {
	const now = new Date();
	const month = String(now.getMonth() + 1).length > 1 ? (now.getMonth() + 1) : `0${(now.getMonth() + 1)}`;
	const date = String(now.getDate()).length > 1 ? now.getDate() : `0${now.getDate()}`;
	return `${[now.getFullYear(), month, date].join('_')}`;
};

/**
 * handling get prop value from passes object
 * @param object
 * @param property
 * @param defaultValue
 * @returns {*|string}
 * @private
 */
export function _get(object, property, defaultValue = false) {
	// check given object
	if(!isObject(object)) {
		return defaultValue;
	}

	const arrayProp = property.split('.');
	let returnValue = '';
	try{
		const currentObject = object[arrayProp.shift()];
		returnValue = arrayProp.length !== 0 ? _get(currentObject, arrayProp.join('.'), defaultValue) : currentObject;
	}catch (e) {
		returnValue = defaultValue;
	}
	return (returnValue === undefined && defaultValue) ? defaultValue : returnValue;
}

export function isRegex(obj) {
	return Object.prototype.toString.call(obj) === '[object RegExp]';
}

export async function loadTemplate(filePath, data) {
	const realPath = `${BASE_WWW_DIR}/${filePath}.html`;
	let content = await FileHelper.readHTMLFile(realPath);
	content = replaceStringInterpolation(content, data);
	content = replaceIncludedTemplate(content, data);
	return content;
}

async function replaceIncludedTemplate(template, data) {
	// replace included template
	const promises = [];
	const listTmplIncluded = template.match(/@include\([\w|\/]+\)/gi);
	// if no included template. return original template
	if(!listTmplIncluded) {
		return template;
	}
	// else
	listTmplIncluded.forEach(item => {
		const fileName = item.match(/\(([\w|\/]+)\)/)[1];
		const realFileName = `${BASE_WWW_DIR}/${fileName}.html`;
		promises.push(FileHelper.readHTMLFile(realFileName));
	});
	let fileContents = await Promise.all(promises);
	fileContents.forEach((replacer, index) => {
		if(replacer) {
			replacer = replaceStringInterpolation(replacer, data);
			template = template.replace(listTmplIncluded[index], replacer)
		}
	});
	return template;
}


function replaceStringInterpolation(template, data) {
	const listStringInt = template.match(/@{(.+)}/g);
	// if no string interpolation. return original template
	if(!listStringInt) {
		return template;
	}
	// else
	listStringInt.forEach(item => {
		let variableName = item.match(/^@{(.+)}$/);
		variableName = variableName && variableName[1] || '.';
		const variable = _get(data, variableName, '');
		if(variable) {
			const replacer = isObject(variable) ? JSON.stringify(variable) : String(variable);
			template = template.replace(item, replacer);
		}else {
			template = template.replace(item, '');
		}
	});
	return template;
}

function isObject(object) {
	if(Object.prototype.toString.call(object) !== '[object Object]'){
		return false;
	}
	return Object.keys(object).length > 0;
}

export function getContentTypeByStaticType(staticType) {
	switch (staticType) {
		case 'css': return 'text/css';
		case 'jpg': return 'image/jpg';
		case 'jpeg': return 'image/jpeg';
		case 'ico': return 'text/x-ico';
		case 'js': return 'text/javascript';
		default: return 'text/plain';
	}
}