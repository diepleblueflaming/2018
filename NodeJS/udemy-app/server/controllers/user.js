'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 09/06/2018 - 07:11
 */
// import user model
const User = require('models/user');
const {
	bindDataToResponse,
	checkDbResponse,
} = require('untils/untils');
const {triggerAPIError} = require('untils/apiError');


// list function is public
module.exports = {
	getAll,
	create,
	update,
	remove
};

async function getAll(req, res, next) {
	try {
		let dbResponse = await User.getAll();
		bindDataToResponse({
			res,
			msg: 'SUCCESS',
			type: 'GET',
			data: dbResponse
		});
		next();
	} catch (e) {
		next(e);
	}
}

async function create(req, res, next) {
	try {
		let user = req.body;
		await checkExistedUser(user.email);
		let dbResponse = await User.create(user);
		checkDbResponse('INSERT', dbResponse);
		bindDataToResponse({
			res,
			msg: 'USER_CREATED',
			type: 'POST_INSERT',
			data: {insertedId: dbResponse.insertedId}
		});
		next();
	} catch (e) {
		next(e);
	}
}

async function update(req, res, next) {
	try {
		let user = req.body;
		let dbResponse = await User.updateById(user);
		checkDbResponse('FIND_UPDATE', dbResponse);
		bindDataToResponse({
			res,
			msg: 'UPDATED_USER',
			type: 'PUT',
			data: dbResponse.value
		});
		next();
	} catch (e) {
		next(e);
	}
}

async function remove(req, res, next) {
	try {
		debugger;
		let email = req.params.email;
		let dbResponse = await User.deleteByEmail(email);
		checkDbResponse('DELETE', dbResponse);
		bindDataToResponse({res, msg: 'DELETED_USER', type: 'DELETE'});
		next();
	} catch (e) {
		next(e);
	}
}

async function checkExistedUser(email) {
	let user = await User.getByEmail(email);
	if (user) {
		throw triggerAPIError('VALIDATION', 'EXISTED_USER');
	}
}
