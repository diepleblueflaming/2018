'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 02/06/2018 - 07:57
 */
const STATUS_CODE = require('constant/statusCodes/index.json');
const MESSAGE = require('constant/message/en.json');
const errorObjects = require('constant/errorObjects');
const _ = require('lodash');
module.exports = {
    log: function (string) {
        if (['testing', 'development'].indexOf(process.env.NODE_ENV) !== -1) {
            console.log(string);
        }
    },
    logPrettyObject: function (obj) {
        if (['testing', 'development'].indexOf(process.env.NODE_ENV) !== -1) {
            console.log(JSON.stringify(obj, undefined, 2));
        }
    },

    instanceOf: function (instance, constructorName, Object) {
        let condition = instance.constructor.name === constructorName;
        if (Object !== undefined) {
            condition = condition && instance instanceof Object;
        }
        return condition;
    },

    CustomError: function (status, name, errors = {}) {
        if (Object.keys(errors).length) {
            errors = _.pick(errors, [
                'name', 'message', 'status', 'resource',
                'field', 'statusCode', 'expiredAt'
            ]);
        }
        this.errors = errors;
        this.name = name || MESSAGE['COMMON'];
        this.status = status || STATUS_CODE['INTERNAL_SERVER_ERROR'];
        return this;
    },

    triggerError: function (type = 'INTERNAL_SERVER', field = 'COMMON') {
        const errorTmp = errorObjects[type];
        return new this.CustomError(
            errorTmp.STATUS_CODE,
            errorTmp.MESSAGE,
            errorTmp[field]
        );
    },

    triggerSystemError: function (err) {
        return new this.CustomError(
            err,
            STATUS_CODE['INTERNAL_SERVER_ERROR'],
            MESSAGE['INTERNAL_SERVER_ERROR']
        );
    }
};
