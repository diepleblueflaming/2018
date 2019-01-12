'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 10/07/2018 - 16:22
 */
const redis = require('middlewares/redis/');
const STATUS_CODE = require('constant/statusCodes/index.json');
const APP_CONSTANT = require('constant/appConstants.json');

const redisCache = {

	setCache: function (req, data) {
		redis.set(req.originalUrl, data);
		redis.expire(req.originalUrl, APP_CONSTANT['TIME_CACHE']);
    },

    getCache: function (resource) {
        return redis.get(resource);
    },

    middleware: async function (req, res, next) {
        try {
            let resource = req.originalUrl;
            let data = await redisCache.getCache(resource);
            if (data === null) {
                next();
                return;
            }
            res.status(STATUS_CODE.OK);
            res.setHeader('Content-Type', 'application/json');
	        res.send(data).end();
        } catch (e) {
            next(e);
        }
    }
};
module.exports = redisCache;
