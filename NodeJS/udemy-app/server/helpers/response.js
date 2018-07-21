'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 20/07/2018 - 21:00
 */
module.exports = function (status, message, data = {}) {
    return {
        data,
        message,
        status
    }
};
