'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 09/06/2018 - 07:11
 */
// import user model
const User = require('models/user');
const Response = require('helpers/response');
const commonHelper = require('helpers/common');
const _ = require('lodash');
const MESSAGE = require('constant/message/en.json');
const STATUS_CODE = require('constant/statusCodes/index.json');

module.exports = {
    login: async function (req, res, next) {
        try {
            let {email, password} = req.body;
            let token = await User.login(email, password);
            res.header({'x-auth': token});
            res.locals.response = new Response(STATUS_CODE.OK, MESSAGE.LOGIN_SUCCESS);
            next();
        } catch (e) {
            next(e);
        }
    },

    logout: async function (req, res, next) {
        try {
            let token = req.header('x-auth');
            User.logout(token);
            res.locals.response = new Response(STATUS_CODE.OK, MESSAGE.LOGOUT_SUCCESS);
            next();
        } catch (e) {
            next(e);
        }
    },

    getAll: async function (req, res, next) {
        try {
            let data = await User.getAll();
            res.locals.response = new Response(STATUS_CODE.OK, MESSAGE.SUCCESS, data);
            next();
        } catch (e) {
            next(e);
        }
    },
    create: async function (req, res, next) {
        try {
            let user = req.body;
            await this.checkExistedUser(user.email);
            let result = await User.create(user);
            if (result.insertedCount !== 1) {
                commonHelper.triggerError();
            }
            res.locals.response = new Response(
                STATUS_CODE.OK, MESSAGE.USER_CREATED, {insertedId: result.insertedId}
            );
            next();
        } catch (e) {
            next(e);
        }
    },

    delete: function (req, res, next) {
        try {
            let email = req.params.email;
            let result = User.deleteByEmail(email);
            if (result.deletedCount === 0) {

            }
            ;
            res.locals.response = new Response(STATUS_CODE.OK, MESSAGE.DELETED_USER);
            next();
        } catch (e) {
            next(e);
        }
    },

    checkExistedUser: async function (email) {
        let user = await User.getByEmail(email);
        if (user) {
            throw commonHelper.triggerError('VALIDATION', 'EXISTED_USER');
        }
    },
};
