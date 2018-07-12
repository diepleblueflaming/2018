'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 02/06/2018 - 07:57
 */
const STATUS_CODE = require('constant/status_code/index.json');
module.exports = {
    log: function (string) {
        if (['testing', 'development'].indexOf(process.env.NODE_ENV) !== -1) {
            console.log(string);
        }
    },
    logObjectPretty: function (obj) {
        if (['testing', 'development'].indexOf(process.env.NODE_ENV) !== -1) {
            console.log(JSON.stringify(obj, undefined, 2));
        }
    },
    customError: function (msg, status = STATUS_CODE.OK, name = 'Error') {
        let err = new Error(msg);
        err.name = name;
        err.status = status;
        return err;
    }
};
