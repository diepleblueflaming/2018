"use strict";
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 02/06/2018 - 13:28
 */
const authenticator = require('middlewares/authentication/authenticator');
module.exports = function (express, app) {
    const user = require("routes/v1/user")(express);
    app.use('/user', user);

    const todo = require('routes/v1/todo')(express);
    app.use('/todo', authenticator.authenticate, todo);
};
