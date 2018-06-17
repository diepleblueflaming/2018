"use strict";
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 02/06/2018 - 07:57
 */

module.exports = {
    logObjectPretty: function (obj) {
        console.log(JSON.stringify(obj, undefined, 2));
    },
    customError: function (msg, status = 200, name = 'Error') {
        let err = new Error(msg);
        err.name = name;
        err.status = status;
        return err;
    }
};
