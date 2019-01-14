"use strict";

/**
 * Project: NodeJS-Master-Class
 * Author: Le Hai Diep(dieple)
 * Date-Time: 22/11/2018-23:19
 */

// const ParamRegx = /^:(\w+)(\(.+\))?$/;
//
// const trimSlash = function (string) {
// 	return string.replace(/^\/+|\/+$/g, '').toLowerCase();
// };
//
// const detectParams = function (realURL, route) {
// 	const params = {};
// 	const arrRealURL = realURL.split('/');
// 	const arrRoute = route.split('/');
//
// 	arrRoute.forEach((piece, index) => {
// 		const arrMatch = piece.match(ParamRegx);
// 		if(arrMatch && Array.isArray(arrMatch)) {
// 			const paramName = arrMatch[1];
// 			params[paramName] = arrRealURL[index];
// 		}
// 	});
// 	return params;
// };
//
// const parserRoute = function (route) {
// 	const trimmedRoute = trimSlash(route);
// 	const arrRoute = trimmedRoute.split('/');
// 	const arrRouteTransformed = arrRoute.map((piece) => {
// 		const arrMatch = piece.match(ParamRegx);
// 		return arrMatch && Array.isArray(arrMatch)  ? (arrMatch[2] || '(.+)') : piece;
// 	});
// 	const strRoute = arrRouteTransformed.join('/');
// 	const strTmp = `^${strRoute}$`;
// 	return new RegExp(strTmp);
// };

new Promise((r, j) => {
	setTimeout(function () {
		r('a');
	}, 3000);
}).
then((res) => {
	console.log(res);
	console.log('then');
});