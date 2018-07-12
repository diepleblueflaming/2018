'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 04/06/2018 - 16:56
 */
const STATUS_CODE = require('constant/status_code/index.json');
module.exports = function (req, res, next) {
  if(typeof res.locals.data !== 'undefined'){
      // send response to user
      res.status(STATUS_CODE.OK);
      res.json(res.locals.data);
      res.end();
      return;
  }
  // pass to 404 handler
  next();
};
