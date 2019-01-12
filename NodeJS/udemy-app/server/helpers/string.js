'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 22/07/2018 - 06:42
 */
const bcrypt = require('bcrypt');

module.exports = {hashPassword, comparePassword};

async function hashPassword(password) {
	let salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
}

function comparePassword(plainPassword, hashPassword) {
	return bcrypt.compare(plainPassword, hashPassword);
}
