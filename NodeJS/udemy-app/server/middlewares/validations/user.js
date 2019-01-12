'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 29/07/2018 - 21:16
 */
const Joi = require('joi');

const userSchema = {
	// GET/ get all user
	'GET/': {},

	// DELETE/ delete user by email
	'DELETE/:email/': {
		params: {
			'email': Joi.string().required().email()
		}
	}
};

exports = module.exports = userSchema;
