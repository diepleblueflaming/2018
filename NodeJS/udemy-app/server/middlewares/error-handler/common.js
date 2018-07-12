'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 04/06/2018 - 16:40
 */
const commonHelper = require('helpers/common');
const STATUS_CODE = require('constant/status_code/index.json');
module.exports = {
    common: function (err, req, res, next) {
        commonHelper.log(err);
        // set locals, only providing error in development
        let isDevelopment = ['development', 'testing'].indexOf(req.app.get('env')) !== -1;
        let errMsg = isDevelopment ? err.name + ': ' + err.message : {};
        res.status(err.status || (err.errorCode || STATUS_CODE.INTERNAL_SERVER_ERROR));
        res.json(errMsg);
    },

    notFound: function (req, res, next) {
        const err = new Error();
        err.status = STATUS_CODE.NOT_FOUND;
        next(err);
    }
};
