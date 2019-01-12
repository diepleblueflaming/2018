"use strict";
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 07/06/2018 - 05:52
 */
const APP_CONSTANT = require('constant/appConstants.json');
const jwt = require('jsonwebtoken');
const redis = require('middlewares/redis/');
const {checkDbResponse} = require('untils/untils');
const {triggerAPIError} = require('untils/apiError');
const {comparePassword, hashPassword, ObjectId} = require('helpers/string');
const _ = require('lodash');


module.exports = {
    UserCollection: function () {
        return process.db.collection('user');
    },

    login: async function (email, password) {
        let user = await this.UserCollection().findOne({email});
        if(!user){
	        throw triggerAPIError('VALIDATION', 'EMAIL');
        }
	    let isVerified = await comparePassword(password, user.password);
        if(!isVerified){
	        throw triggerAPIError('VALIDATION', 'PASSWORD');
        }
	    return await this.updateUserTokens(user);
    },

	logout: function (email) {
		let userKeyInRedis = `${APP_CONSTANT['REDIS_USER_LOGIN_PREFIX']}${email}`;
		redis.del(userKeyInRedis);
    },

    getAll: function () {
        return this.UserCollection().find({}).toArray();
    },

    getById: function (id) {
        return this.UserCollection().findOne({_id: id});
    },

    getByEmail: function (email) {
        return this.UserCollection().findOne({email});
    },

    create: async function (user) {
	    user.password = await hashPassword(user.password);
        user.tokens = [];
        return this.UserCollection().insertOne(user);
    },

	updateById: async function (user) {
		let _id = ObjectId(user._id);
		// hash password if change
		if (user.hasOwnProperty('password')) {
			user.password = await hashPassword(user.password);
		}
		user = _.omit(user, '_id');
		return this.UserCollection().findOneAndUpdate(
			{_id},
			{$set: user},
			{returnOriginal: false}
		);
    },

	updateUserTokens: async function (user) {
		let userKeyInRedis = `${APP_CONSTANT['REDIS_USER_LOGIN_PREFIX']}${user.email}`;
        let access = new Date().getTime();  // as timestamp
		let token = this.signJWTUserToken(user);
        user.tokens.push({access, token});
		let dbResponse = await this.UserCollection().findOneAndUpdate(
			{_id: user._id},
			{$set: {tokens: user.tokens}},
			{returnOriginal: false}
		);
		checkDbResponse('FIND_UPDATE', dbResponse);
		redis.setUserInfo(
			userKeyInRedis,
			dbResponse.value,
			parseInt(APP_CONSTANT['USER_TOKEN_EXPIRE_TIME'])
		);
		return dbResponse.value;
    },

    removeUserToken: function (token) {
        return this.UserCollection().update(
            {},
            {
                $pull: {tokens: {token}}
            });
    },

    deleteByEmail: function (email) {
	    return this.UserCollection().deleteOne({email});
    },

	isUserLogged: async function (email) {
		let userKeyInRedis = `${APP_CONSTANT['REDIS_USER_LOGIN_PREFIX']}${email}`;
		let userCache = await redis.getUserInfo(userKeyInRedis);
		if (!userCache) {
			return false;
		}
		let lastLoginToken = _.last(userCache['tokens']).token;
		try {
			// if user is logged but token is expired, force login again
			jwt.verify(lastLoginToken, APP_CONSTANT['JWT_PUBLIC_KEY']);
		} catch (e) {
			return false;
		}
		return lastLoginToken;
	},

	signJWTUserToken: function (user) {
		let payload = {
			_id: user._id,
			email: user.email
		};
		return jwt.sign(
			payload,
			APP_CONSTANT['JWT_PUBLIC_KEY'],
			{expiresIn: APP_CONSTANT['USER_TOKEN_EXPIRE_TIME']}
		);
    }
};
