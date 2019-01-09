"use strict";
/**
 * Project: NodeJS-Master-Class
 * Author: Le Hai Diep(dieple)
 * Date-Time: 21/12/2018-21:31
 */

import {isValidToken} from '../utils';
import Storage from '../lib/Storage';

export default async function (req, res, next) {
	const token = req.headers['x-auth'];
	if(isValidToken(token)) {
		const shadowTokens = await Storage.getItem('token');
		const tokens = shadowTokens ? JSON.parse(shadowTokens) : [];
		const tokenAvailable = tokens.indexOf(token) > -1;
		if(tokenAvailable){
			next();
			return;
		}
	}
	res.body = {statusCode: 401, msg: 'Unauthorized !'};
	next('end-request');
};