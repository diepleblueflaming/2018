'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 09/06/2018 - 07:11
 */
// import user model
const User = require('models/User');
module.exports = {
    login: async function (req, res, next) {
        try {
            let {email, password} = req.body;
            let r = await User.login(email, password);
            res.header({'x-auth': r.token});
            delete r.token;
            res.locals.data = r;
            next();
        } catch (e) {
            next(e);
        }
    },

    logout: async function (req, res, next) {
        try {
            let token = req.header('x-auth');
            res.locals.data = User.logout(token);
            next();
        } catch (e) {
            next(e);
        }
    },

    getAll: async function (req, res, next) {
        try {
            res.locals.data = await User.getAll();
            next();
        } catch (e) {
            next(e);
        }
    },
    create: async function (req, res, next) {
        let user = req.body;
        try {
            res.locals.data = await User.create(user);
            next();
        } catch (e) {
            next(e);
        }
    }
};
