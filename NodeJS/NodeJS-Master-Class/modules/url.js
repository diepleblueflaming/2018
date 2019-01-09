"use strict";
/**
 * Project: NodeJS-Master-Class
 * Author: Le Hai Diep(dieple)
 * Date-Time: 14/11/2018-05:46
 */

export function urlHandler(urlString) {
	urlString = '/foo';
	const urlObject = new URL(urlString);
	console.log(urlObject);
}