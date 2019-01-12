'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 29/07/2018 - 21:33
 */
const User = require('models/user');
const acl = require('middlewares/roleBased/');
const _ = require('lodash');
const {bindDataToResponse} = require('untils/untils');

exports = module.exports = {login, logout};

async function login(req, res, next) {
	try {
		let {email, password} = req.body;
		let token = await User.isUserLogged(email);
		if (!token) {
			let dbResponse = await User.login(email, password);
			await acl.setUserRole(dbResponse._id.toString(), dbResponse.role);
			token = _.last(dbResponse['tokens']).token;
		}
		res.header({'x-auth': token});
		bindDataToResponse({res, msg: 'LOGIN_SUCCESS', type: 'POST'});
		next();
	} catch (e) {
		next(e);
	}
}

async function logout(req, res, next) {
	try {
		let email = req.userLogged.email;
		User.logout(email);
		bindDataToResponse({res, msg: 'LOGOUT_SUCCESS', type: 'POST'});
		next();
	} catch (e) {
		next(e);
	}
}
