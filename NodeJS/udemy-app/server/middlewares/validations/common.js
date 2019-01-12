'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 05/08/2018 - 19:18
 */
const Joi = require('joi');

const commonSchema = {
	headers: {
		'x-auth': Joi.string().required()
	}
};

module.exports = commonSchema;
