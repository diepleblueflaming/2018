"use strict";
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 07/06/2018 - 05:52
 */
const jwt = require("jsonwebtoken");
const keyHash = 'jwt-key';
const bcrypt = require('bcrypt');
const commonHelper = require("helpers/common");
const redis = require('middlewares/redis/');
const MESSAGE = require('constant/message/en.json');
const STATUS_CODE = require('constant/status_code/index.json');
module.exports = {
    UserCollection: function () {
        return process.db.collection('user');
    },

    login: async function (email, password) {
        let user = await this.UserCollection().findOne({email: email});
        if(!user){
            throw commonHelper.customError(MESSAGE.USER_NOT_FOUND, 401);
        }
        let isVerified = await bcrypt.compare(password, user.password);
        if(!isVerified){
            throw commonHelper.customError(MESSAGE.PASSWORD_INVALID, 401);
        }
        return this.updateUserTokens(user);
    },

    logout: function (token) {
        jwt.verify(token, keyHash);
        redis.set(`user-logged-${token}`, null);
        return {message: MESSAGE.LOGOUT_SUCCESS};
    },

    getAll: function () {
        return this.UserCollection().find({}).toArray();
    },

    getById: function (id) {
        return this.UserCollection().findOne({_id: id});
    },

    getByName: function () {

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
        let token = jwt.sign({_id: user._id}, keyHash, {expiresIn: '3h'});
        user.tokens.push({access, token});
        return this.UserCollection().findOneAndUpdate({
            _id: user._id
        }, {
            $set: {tokens: user.tokens}
        },{
          returnOriginal: false
        }).then(() => {
            redis.set(`user-logged-${token}`, user);
            return {token: token, message: MESSAGE.LOGIN_SUCCESS}
        });
    },

    removeUserToken: function (token) {
        return this.UserCollection().update(
            {},
            {
                $pull: {tokens: {token}}
            });
    },

    deleteById: function () {

    }
};
