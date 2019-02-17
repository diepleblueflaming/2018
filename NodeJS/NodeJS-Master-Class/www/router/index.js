"use strict";
/**
 * Project: NodeJS-Master-Class
 * Author: Le Hai Diep(dieple)
 * Date-Time: 12/02/2019-19:20
 */
import Route from '../../core/route';
import {_get, loadTemplate} from "../../utils";
import FileHelper from "../../lib/FileHelper";

const pathUserFile = 'data/users.json';
const route = new Route();

route.get('/', async function (req, res, next) {
	const content = await loadTemplate('template/index', {});
	res.data = {content};
	next();
});

route.get('/user', async function (req, res, next) {
	const content = await loadTemplate('template/users', {});
	res.data = {
		content,
		metadata: {
			title: 'Users Page'
		}
	};
	next();
});

route.get('/login', async function (req, res, next) {
	const content = await loadTemplate('template/login', {});
	res.data = {
		content, metadata: {
			title: 'Login Page'
		}
	};
	next();
});

route.post('/login', async function (req, res, next) {
	const userInfo = req.body;

	// load list user from local
	const users = await FileHelper.readFile(pathUserFile, {jsonMode: true});
	const isValidUser = users.find(user => user.email === userInfo.email && user.password === userInfo.password);

	if (isValidUser) {
		const userUrl = 'user';
		res.writeHead(301, {Location: userUrl});
		res.end();
	} else {
		const content = await loadTemplate('template/login', {data: {error: 'Email or Password is invalid'}});
		res.data = {
			content, metadata: {
				title: 'Login Page'
			}
		};
		next();
	}
});

route.all(async function (req, res, next) {
	const content = _get(res, 'data.content') || '';
	const metadata = _get(res, 'data.metadata') || {};

	// set default title
	const appTitle = _get(metadata, 'title', '');
	if (!appTitle) {
		metadata['title'] = 'Node JS Master Class';
	}
	const data = await loadTemplate('layout/layout', {content, data: metadata});
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end(data);
});

export default route;