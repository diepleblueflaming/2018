"use strict";
/**
 * Project: NodeJS-Master-Class
 * Author: Le Hai Diep(dieple)
 * Date-Time: 18/11/2018-16:58
 */
const User = {};
import FileHelper from '../lib/FileHelper';

const pathUserFile = 'data/users.json';

User.getAll = async function (req, res, next) {
	const users = await FileHelper.readFile(pathUserFile, {jsonMode: true});
	res.body = {statusCode: 200, msg: 'successfully', data: users};
	next('end-request');
};

User.get = async function (req, res, next) {
	const userId = req.params.id;
	const users = await FileHelper.readFile(pathUserFile, {jsonMode: true});
	const user = users.find(user => user.id === userId);
	res.body = {statusCode: 200, msg: 'successfully', data: user};
	next('end-request');
};

User.add = async function (req, res, next) {
	try {
		const user = req.body;
		let users = await FileHelper.readFile(pathUserFile, {jsonMode: true});
		users.push(user);
		await FileHelper.writeFile(pathUserFile, users);
		res.body = {statusCode: 200, msg: 'successfully', data: user};
	} catch (e) {
		console.log(e);
		res.body = {statusCode: 400, msg: 'Cannot add new user !'};
	}
	next('end-request');
};

User.delete = async function (req, res, next) {
	try {
		const userId = req.params.id;
		const users = await FileHelper.readFile(pathUserFile, {jsonMode: true});
		const newUsers = users.filter(user => user.id !== userId);
		await FileHelper.writeFile(pathUserFile, newUsers);
		res.body = {statusCode: 200, msg: 'The user is deleted !'};
	} catch (e) {
		res.body = {statusCode: 500, msg: 'Can\' delete this user!'};
	}
	next('end-request');
};

User.update = async function (req, res, next) {
	try {
		const newUser = req.body;
		let users = await FileHelper.readFile(pathUserFile, {jsonMode: true});
		const oldUserPos = users.findIndex(i => i.id === newUser.id);
		users[oldUserPos] = newUser;
		await FileHelper.writeFile(pathUserFile, users);
		res.body = {statusCode: 200, msg: 'The user is updated !'};
	} catch (e) {
		res.body = {statusCode: 500, msg: 'Can\' update this user!'};
	}
	next('end-request');
};

export default User;