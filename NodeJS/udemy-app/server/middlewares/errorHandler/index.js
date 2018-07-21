'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 04/06/2018 - 16:40
 */
const commonHelper = require('helpers/common');
module.exports = {
    common: function (err, req, res, next) {
        if (!commonHelper.instanceOf(err, 'CustomError')) {
            err = commonHelper.triggerSystemError(err);
        }
        commonHelper.logPrettyObject(err);
        // set locals, only providing error in development
        let isDevelopment = ['development', 'testing'].includes(req.app.get('env'));
        let errObj = isDevelopment ? err : {};
        res.status(err.status);
        res.json(errObj).end();
    },

    notFound: function (req, res, next) {
        const err = commonHelper.triggerError('RESOURCE_NOT_FOUND');
        next(err);
    }
};
