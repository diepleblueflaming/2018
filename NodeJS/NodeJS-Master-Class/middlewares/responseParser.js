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
	res.writeHead(statusCode, {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json; charset=UTF-8'
	});
	res.end(JSON.stringify(resObj));
};