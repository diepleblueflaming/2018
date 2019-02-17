"use strict";
/**
 * Project: NodeJS-Master-Class
 * Author: Le Hai Diep(dieple)
 * Date-Time: 15/11/2018-21:55
 */

import {StringDecoder} from 'string_decoder';
import {parse} from 'querystring';

const decoder = new StringDecoder('utf-8');

export function bodyParser(req, res, next) {
		let buffer = '';
		req.on('data', function (data) {
			buffer += decoder.write(data);
		});

		req.on('end', function () {
			const contentType = req.headers['content-type'];
			switch (contentType) {
				case 'application/json': {
					req.body = buffer && JSON.parse(buffer);
					break;
				}
				case 'text/html': {
					req.body = buffer;
					break;
				}
				case 'application/x-www-form-urlencoded': {
					req.body = parse(buffer);
					break;
				}
				default : {
					req.body = null;
				}
			}
			next();
		});
}