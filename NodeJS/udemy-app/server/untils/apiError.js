'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 03/08/2018 - 07:28
 */
const STATUS_CODE = require('constant/statusCodes/index.json');
const MESSAGE = require('constant/message/en.json');
const errorObjects = require('constant/errorObjects');
const {ValidationError} = require('express-validation');
const {instanceOf} = require('helpers/common');
const _ = require('lodash');

class APIError {
	constructor(status, name, error) {
		this._status = status || STATUS_CODE['INTERNAL_SERVER_ERROR'];
		this._name = name || MESSAGE['COMMON'];
		this._error = this.standardizeOwnError(error);
	}

	standardizeOwnError(error) {
		error = error || {};
		let errorType = Object.prototype.toString.call(error);
		if (Object.keys(error).length && errorType !== '[object Array]') {
			error = _.pick(error, [
				'name', 'message', 'status', 'resource',
				'field', 'statusCode', 'expiredAt'
			]);
		}
		return error;
	}

	/**
	 * @description fnc trigger an APIError
	 * @static
	 * @param type
	 * @param field
	 * @return {APIError}
	 */
	static triggerAPIError(type = 'INTERNAL_SERVER', field = 'COMMON') {
		const errorTmp = errorObjects[type];
		return new APIError(
			errorTmp.STATUS_CODE,
			errorTmp.MESSAGE,
			errorTmp[field]
		);
	}

	/**
	 * @description fnc convert an other error to an APIError
	 * @static
	 * @param otherError
	 * @return {*}
	 */
	static convertToAPIError(otherError) {
		let apiError = otherError;
		if (instanceOf(otherError, 'HttpError')) {
			apiError = convertAccessControlError(otherError);
		} else if (instanceOf(otherError, 'ValidationError', ValidationError)) {
			apiError = convertValidationError(otherError);
		} else if (!instanceOf(otherError, 'APIError', APIError)) {
			apiError = convertSystemError(otherError);
		}
		return apiError;

		/**
		 * @private
		 * @param error
		 * @return {APIError}
		 */
		function convertSystemError(error) {
			error = _.pick(error, ['name', 'message']);
			return new APIError(
				STATUS_CODE['INTERNAL_SERVER_ERROR'],
				MESSAGE['INTERNAL_SERVER_ERROR'],
				error
			);
		}

		/**
		 * @param  validationErrorObj
		 * @return {APIError}
		 * @description Convert ValidationError to standard error.
		 */
		function convertValidationError(validationErrorObj) {
			let errors = standardizeValidationError(validationErrorObj['errors']);
			return new APIError(
				STATUS_CODE['VALIDATION_ERROR'],
				MESSAGE['VALIDATION_ERROR'],
				errors
			);
		}

		/**
		 * @description fnc convert access control error toAPIError
		 * @param accessControlErr
		 * @return {APIError}
		 */
		function convertAccessControlError(accessControlErr) {
			let error = _.pick(accessControlErr, ['message']);
			return new APIError(
				accessControlErr.errorCode || STATUS_CODE['INTERNAL_SERVER'],
				MESSAGE['ACCESS_PERMISSION'],
				error
			);
		}

		function standardizeValidationError(errors) {
			return errors.map((err) => {
				err.field = _.last(err.field);
				err.messages = _.last(err.messages).replace(/['|"]/g, '');
				err = _.omit(err, 'types');
				return err;
			});
		}

	}

	toString() {
		return JSON.stringify(this);
	}

	toObject() {
		let status = this._status;
		let name = this._name;
		let error = this._error;
		return {status, name, error}
	}
}

module.exports = APIError;

