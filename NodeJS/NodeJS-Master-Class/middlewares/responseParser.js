"use strict";
/**
 * Project: NodeJS-Master-Class
 * Author: Le Hai Diep(dieple)
 * Date-Time: 21/11/2018-22:44
 */
export default function (req, res, next) {
	const {statusCode, msg, data} = res.body;
	const resObj = {
		code: statusCode,
		message: msg,
		data
	};
	res.writeHead(statusCode, {'Content-Type': 'application/json'});
	res.end(JSON.stringify(resObj));
};