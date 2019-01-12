'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 09/06/2018 - 08:30
 */
const APP_CONSTANT = require('constant/appConstants.json');
const jwt = require('jsonwebtoken');
const redis = require('middlewares/redis/');
const {triggerAPIError} = require('untils/apiError');

module.exports = {authenticate};

async function getUserCacheByEmail(email) {
	let userKeyInRedis = `${APP_CONSTANT['REDIS_USER_LOGIN_PREFIX']}${email}`;
	let userCache = await redis.getUserInfo(userKeyInRedis);
	if (userCache === null) {
		throw triggerAPIError('AUTHENTICATION', 'USER_NOT_FOUND');
	}
	return userCache;
}

async function authenticate(req, res, next) {
	try {
		let token = req.header('x-auth');
		if (token === undefined) {
			throw triggerAPIError('AUTHENTICATION', 'MISSING_TOKEN');
		}
		let userDecoded = jwt.verify(token, APP_CONSTANT['JWT_PUBLIC_KEY']);
		let userCache = await getUserCacheByEmail(userDecoded.email);
		req.userLogged = userCache;
		next();
	} catch (e) {
		next(e);
	}
}
