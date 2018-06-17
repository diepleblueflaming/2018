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
const LOGIN_SUCCESS_MSG = 'login successfully !!!!';
const LOGIN_PASSWORD_INVALID = 'Password is invalid';
const LOGIN_USER_NOT_FOUND = 'User not found';

module.exports = {
    UserCollection: function () {
        return process.db.collection('user');
    },
    login: async function (email, password) {
        let user = await this.UserCollection().findOne({email: email});
        if(!user){
            throw commonHelper.customError(LOGIN_USER_NOT_FOUND, 401);
        }
        let isVerified = await bcrypt.compare(password, user.password);
        if(!isVerified){
            throw commonHelper.customError(LOGIN_PASSWORD_INVALID, 401);
        }
        return this.updateUserTokens(user);
    },
    getAll: function () {
        return this.UserCollection().find({}).toArray();
    },
    getOneByName: function () {

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
        let token = jwt.sign({_id: user._id}, keyHash);
        user.tokens.push({access, token});
        return this.UserCollection().findOneAndUpdate({
            _id: user._id
        }, {
            $set: {tokens: user.tokens}
        },{
          returnOriginal: false
        }).then(() => {
            return {token: token, message: LOGIN_SUCCESS_MSG}
        });
    },
    deleteById: function () {

    }
};
