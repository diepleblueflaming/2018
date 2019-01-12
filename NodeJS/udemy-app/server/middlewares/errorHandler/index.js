'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 04/06/2018 - 16:40
 */
const {log, isDevelopment} = require('helpers/common');
const {convertToAPIError, triggerAPIError} = require('untils/apiError');

module.exports = {
	handleError,
	handleResourceNotFound
};

function handleError(err, req, res, next) {
	// log error
	log(err);

	// convert error to standard error if need
	err = convertToAPIError(err).toObject();

	// set locals, only providing error in development
	let errObj = isDevelopment() ? err : {};

	// send error
	res.status(err.status);
	res.json(errObj).end();
}

function handleResourceNotFound(req, res, next) {
	const err = triggerAPIError('RESOURCE_NOT_FOUND');
	next(err);
}
