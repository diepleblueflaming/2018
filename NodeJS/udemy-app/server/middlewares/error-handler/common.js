"use strict";
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 04/06/2018 - 16:40
 */
module.exports = {
    common: function (err, req, res, next) {
        console.log(err);
        // set locals, only providing error in development
        let errMsg = req.app.get('env') === 'development' ? err.name + ': ' + err.message : {};
        res.status(err.status || 500);
        res.json(errMsg);
    },

    notFound: function (req, res, next) {
        const err = new Error('This request not match any route');
        err.status = 404;
        next(err);
    }
};
