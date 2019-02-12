"use strict";
/**
 * Project: NodeJS-Master-Class
 * Author: Le Hai Diep(dieple)
 * Date-Time: 21/11/2018-06:13
 */
import crypto from 'crypto';

const TOKEN_LENGTH = 20;
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
export function _get(object, property, defaultValue) {
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

export function genRandomString(length) {

}