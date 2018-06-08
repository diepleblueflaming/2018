"use strict";
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 04/06/2018 - 16:56
 */
module.exports = function (req, res, next) {
  if(typeof res.locals.data !== 'undefined'){
      // send response to user
      res.status(200);
      res.json(res.locals.data);
  }
  // pass to 404 handler
  next();
};
