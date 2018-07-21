'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 04/06/2018 - 16:56
 */
const STATUS_CODE = require('constant/statusCodes/index.json');
module.exports = function (req, res, next) {
    let response = res.locals.response;
    if (typeof response !== 'undefined') {
      // send response to user
        res.status(response.status || STATUS_CODE.OK);
        res.json(response).end();
      return;
  }
  // pass to 404 handler
  next();
};
