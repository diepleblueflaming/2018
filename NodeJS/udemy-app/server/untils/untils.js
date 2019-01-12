'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 29/07/2018 - 21:48
 */

const STATUS_CODE = require('constant/statusCodes/index.json');
const MESSAGE = require('constant/message/en.json');
const expressValidation = require('express-validation');
const {triggerAPIError} = require('untils/apiError');
const commonSchema = require('middlewares/validations/common');

exports = module.exports = {
	bindDataToResponse,
	checkDbResponse,
	validation,
	commonValidation
};

// config option for express-validation
expressValidation.options({
	// return an error if body has an unrecognised property
	allowUnknownBody: false,
	allowUnknownHeaders: true,
	allowUnknownQuery: true,
	allowUnknownParams: false,
	allowUnknownCookies: true
});

function bindDataToResponse(args) {
	const expectArgument = {res: 'required', msg: 'required', type: 'required'};
	let status = STATUS_CODE['OK'];
	let statusCodes = {
		'POST': STATUS_CODE['OK'],
		'POST_INSERT': STATUS_CODE['CREATED'],
		'PUT': STATUS_CODE['CREATED'],
		'DELETE': STATUS_CODE['OK'],
		'GET': STATUS_CODE['OK'],
	};
	// check argument
	args = checkParam(args, expectArgument, 'bindDataToResponse()');

	let data = args.data;
	let responseObj = {
		message: MESSAGE[args['msg']] || '',
		status: args['type'] in statusCodes ? statusCodes[args['type']] : status,
		data
	};
	args.res.locals.response = responseObj;
	return responseObj;
}

function checkDbResponse(action, res, type = 'one') {
	let hasError = false;
	switch (action) {
		case 'INSERT':
			hasError = type === 'one' ? res.insertedCount !== 1 : res.insertedCount < 2;
			break;
		case 'DELETE':
			hasError = type === 'one' ? res.deletedCount !== 1 : res.deletedCount < 2;
			break;
		case 'UPDATE':
			hasError = type === 'one' ? res.modifiedCount !== 1 : res.modifiedCount < 2;
			break;
		case 'FIND':
			hasError = type === 'one' ? !res : !Array.isArray(res);
			break;
		default:
			hasError = res.lastErrorObject.n === 0 || res.value === null;
			break;
	}
	if (hasError) {
		throw triggerAPIError('INTERNAL_SERVER', 'DATABASE');
	}
}

function checkParam(argumnents, expect, fncName) {
	for (let parameter in expect) {
		if (!expect.hasOwnProperty(parameter)) {
			return;
		}
		if (expect[parameter] === 'required') {
			if (!argumnents.hasOwnProperty(parameter)) {
				throw new Error(`Argument of ${fncName} is invalid`);
			}
		} else {
			argumnents[parameter] = {};
		}
	}
	return argumnents;
}

function validation(schema) {
	function callback(req, res, next) {
		let schemaKey = [req.method, req.route.path].join('/').replace('//', '/');
		let JoiSchema = schema[schemaKey] || schema[schemaKey + '/'];
		// validate each request
		expressValidation(JoiSchema)(req, res, next);
	}

	return callback;
}

function commonValidation() {
	function callback(req, res, next) {
		expressValidation(commonSchema)(req, res, next);
	}

	return callback;
}



