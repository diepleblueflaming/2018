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
	set: function (key, value, timeExpire) {
        value = typeof value === 'object' ? JSON.stringify(value) : value;
        redisClient.set(key, value, redis.print);
		if (timeExpire !== undefined) {
			this.expire(key, timeExpire, redisClient.print);
		}
    },

    get: function (key) {
        const redisGet = blueBird.promisify(redisClient.get, {context: redisClient});
        return redisGet(key);
    },

	hgetall: function (key) {
		const promiseHgetAll = blueBird.promisify(redisClient.hgetall, {context: redisClient});
		return promiseHgetAll(key);
	},

	del: function (key) {
		return redisClient.del(key);
	},

	expire: function (userKey, miliseconds) {
		redisClient.expire(userKey, parseInt(miliseconds) / 1000, redis.print);
	},

	setUserInfo: function (userKey, user, timeExpire) {
		user._id = user._id.toString();
		user = commonHelper.flatObject(user);
		redisClient.hmset(userKey, user, redis.print);
		this.expire(userKey, timeExpire);
	},

	getUserInfo: async function (userKey) {
		let userInfo = await this.hgetall(userKey);
		if (userInfo === null) {
			return null;
		}
		userInfo = commonHelper.unFlatObject(userInfo);
		return userInfo;
	}
};
