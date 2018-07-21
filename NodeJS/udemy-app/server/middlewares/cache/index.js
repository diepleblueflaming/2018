'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 10/07/2018 - 16:22
 */
const redis = require('middlewares/redis/');
const STATUS_CODE = require('constant/statusCodes/index.json');
const redisCache = {
    setCache: function (resource, data) {
        redis.set(resource, data);
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
            res.send(data);
        } catch (e) {
            next(e);
        }
    }
};
module.exports = redisCache;
