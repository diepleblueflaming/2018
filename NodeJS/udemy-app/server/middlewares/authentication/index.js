'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 09/06/2018 - 08:30
 */
const jwt = require('jsonwebtoken');
const keyHash = 'jwt-key';
const commonHelper = require('helpers/common');
const redis = require('middlewares/redis/');
const acl = require('middlewares/role-based/');
const MESSAGE = require('constant/message/en.json');
const STATUS_CODE = require('constant/status_code/index.json');
module.exports = {
    authenticate: async function (req, res, next) {
        let token = req.header('x-auth');
        try {
            jwt.verify(token, keyHash);
            let userCache = await redis.get(`user-logged-${token}`);
            if (userCache === null || userCache === 'null') {
                next(commonHelper.customError(MESSAGE.BAD_REQUESTED, STATUS_CODE.BAD_REQUEST));
            }
            userCache = JSON.parse(userCache);
            res.userLogged = userCache;
            acl.setUserRole(userCache._id, userCache.role);
            next();
        } catch (e) {
            next(commonHelper.customError(MESSAGE.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED));
        }
    }
};
