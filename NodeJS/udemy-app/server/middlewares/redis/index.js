'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 01/07/2018 - 17:57
 */
const redis = require('redis');
const commonHelper = require('helpers/common');
const blueBird = require('bluebird');
const MESSAGE = require('constant/message/en.json');
const redisClient = redis.createClient();

redisClient.on('connect', () => commonHelper.log(MESSAGE['REDIS_CONNECT_SUCCESS']));
redisClient.on('error', (err) => {
    commonHelper.log(MESSAGE['REDIS_CONNECT_FAILED'] + err);
    process.exit(1);
});

module.exports = {
    set: function (key, value) {
        value = typeof value === 'object' ? JSON.stringify(value) : value;
        redisClient.set(key, value, redis.print);
    },

    get: function (key) {
        const redisGet = blueBird.promisify(redisClient.get, {context: redisClient});
        return redisGet(key);
    }
};
