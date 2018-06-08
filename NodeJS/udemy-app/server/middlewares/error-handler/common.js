"use strict";
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 04/06/2018 - 16:40
 */
module.exports = {
    common: function (err, req, res, next) {
        // set locals, only providing error in development
        let errMsg = req.app.get('env') === 'development' ? err.name + ': ' + err.message : {};
        console.log(req.app.get('env'));
        res.status(err.status || 500);
        res.json(errMsg);
    },

    notFound: function (req, res, next) {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
};
