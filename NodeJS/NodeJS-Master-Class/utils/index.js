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
export const generateToken = function() {
	return String(crypto.randomBytes(20).toString('hex').slice(0, TOKEN_LENGTH));
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