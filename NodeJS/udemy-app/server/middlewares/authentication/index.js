'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 09/06/2018 - 08:30
 */
const jwt = require('jsonwebtoken');
const redis = require('middlewares/redis/');
const acl = require('middlewares/roleBased/');
const commonHelper = require('helpers/common');
const APP_CONSTANT = require('constant/appConstants.json');

const Authenticator = {
    getUserCacheByToken: async function (token) {
        let userCache = await redis.get(`${APP_CONSTANT['REDIS_USER_LOGIN_PREFIX']}-${token}`);
        if (userCache === null || userCache === 'null') {
            throw commonHelper.triggerError('AUTHENTICATION', 'USER_NOT_FOUND');
        }
        return JSON.parse(userCache);
    },

    authenticate: async function (req, res, next) {
        try {
            let token = req.header('x-auth');
            if (token === undefined) {
                throw commonHelper.triggerError('AUTHENTICATION', 'MISSING_TOKEN');
            }
            jwt.verify(token, APP_CONSTANT['JWT_PUBLIC_KEY']);
            let userCache = await Authenticator.getUserCacheByToken(token);
            res.userLogged = userCache;
            acl.setUserRole(userCache._id, userCache.role);
            next();
        } catch (e) {
            next(e);
        }
    }
};

module.exports = Authenticator;
