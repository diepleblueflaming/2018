"use strict";
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 07/06/2018 - 05:52
 */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const redis = require('middlewares/redis/');
const commonHelper = require('helpers/common');
const APP_CONSTANT = require('constant/appConstants.json');

module.exports = {
    UserCollection: function () {
        return process.db.collection('user');
    },

    login: async function (email, password) {
        let user = await this.UserCollection().findOne({email});
        if(!user){
            throw commonHelper.triggerError('VALIDATION', 'EMAIL');
        }
        let isVerified = await bcrypt.compare(password, user.password);
        if(!isVerified){
            throw commonHelper.triggerError('VALIDATION', 'PASSWORD');
        }
        return this.updateUserTokens(user);
    },

    logout: function (token) {
        redis.set(`${APP_CONSTANT['REDIS_USER_LOGIN_PREFIX']}-${token}`, null);
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
        let salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        user.tokens = [];
        return this.UserCollection().insertOne(user);
    },

    updateById: function () {
    },

    updateUserTokens: function (user) {
        let access = new Date().getTime();  // as timestamp
        let token = jwt.sign({_id: user._id}, APP_CONSTANT['JWT_PUBLIC_KEY'], {expiresIn: '3h'});
        user.tokens.push({access, token});
        return this.UserCollection().findOneAndUpdate({
            _id: user._id
        }, {
            $set: {tokens: user.tokens}
        },{
          returnOriginal: false
        }).then(() => {
            redis.set(`${APP_CONSTANT['REDIS_USER_LOGIN_PREFIX']}-${token}`, user);
            return token;
        });
    },

    removeUserToken: function (token) {
        return this.UserCollection().update(
            {},
            {
                $pull: {tokens: {token}}
            });
    },

    deleteByEmail: function (email) {
        return this.UserCollection().deleteMany({email});
    }
};
