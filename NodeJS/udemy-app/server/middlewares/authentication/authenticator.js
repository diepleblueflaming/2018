"use strict";
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 09/06/2018 - 08:30
 */
const jwt = require('jsonwebtoken');
const keyHash = 'jwt-key';
const commonHelper = require("helpers/common");
const UNAUTHORIZED_STATUS_CODE = 401;
const UNAUTHORIZED_MSG = 'UNAUTHORIZED';
module.exports = {
    authenticate: function (req, res, next) {
        let token = req.header('x-auth');
        try {
            jwt.verify(token, keyHash);
            next();
        } catch (e) {
            next(commonHelper.customError(UNAUTHORIZED_MSG, UNAUTHORIZED_STATUS_CODE));
        }
    }
};
