'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 04/06/2018 - 16:56
 */
module.exports = function (req, res, next) {
    let response = res.locals.response;
	if (response !== undefined) {
		// send response to user
		res.status(response.status);
        res.json(response).end();
		return;
	}
	// pass control to resource not found middleware
	next();
};
