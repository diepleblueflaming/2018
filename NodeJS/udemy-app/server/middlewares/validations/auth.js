'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 29/07/2018 - 21:27
 */
const Joi = require('joi');

const authSchema = {

	// POST  /auth/login
	'POST/login/': {
		body: {
			email: Joi.string().email().required(),
			password: Joi.string().required().min(5)
		}
	},

	// POST /auth/logout
	'POST/logout/': {
		headers: {
			'x-auth': Joi.string().required()
		}
	}
};
exports = module.exports = authSchema;
