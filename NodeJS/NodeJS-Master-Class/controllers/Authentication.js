"use strict";
/**
 * Project: NodeJS-Master-Class
 * Author: Le Hai Diep(dieple)
 * Date-Time: 25/11/2018-23:10
 */
import FileHelper from '../lib/FileHelper';
import Storage from '../lib/Storage';
import {generateToken} from '../utils';

const authentication = {};
const pathUserFile = 'data/users.json';

/**
 * Handling when user login request
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
authentication.login = async function (req, res, next) {
	const {email, password} = req.body;

	// load list user from local
	const users = await FileHelper.readFile(pathUserFile, {jsonMode: true});
	const isValidUser = users.find(user => user.email === email && user.password === password);

	if (isValidUser) {
		const token = generateToken();
		res.setHeader('x-auth', token);
		res.body = {statusCode: 200, msg: 'Login successfully !'};

		// store token to local storage
		await authentication.storeToken(token);
	}else {
		res.body = {statusCode: 401, msg: 'Login failed !'};
	}
	next('end-request');
};


authentication.logout = async function(req, res, next) {
	const token = req.headers['x-auth'];
	const tokens = await Storage.getItem('token');
	const tokensCopy = JSON.parse(tokens);
	const tokenPosition = tokensCopy.indexOf(token);
	if(tokenPosition > -1) {
		const newTokens =  tokensCopy.filter((tk) => tk !== token);
		await Storage.setItem('token', newTokens);
		res.body = {statusCode: 200, msg: 'Logout successfully'};
	}else {
		res.body = {statusCode: 500, msg: 'Internal server error !'};
	}
	next('end-request');
};


authentication.register = function (req, res, next) {

};

authentication.storeToken = async function (token) {
	const shadowTokens = await Storage.getItem('token');
	const tokens = shadowTokens ? JSON.parse(shadowTokens) : [];
	tokens.push(token);
	await Storage.setItem('token', tokens);
};

export  default authentication;