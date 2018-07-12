'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 04/06/2018 - 18:36
 */
const validator = require('validator');
const MESSAGE = require('constant/message/en.json');
module.exports = function (modelName, model, data) {
    let err = {name: 'DataError', message: '', status: 403};
    for(let property in model){
        let value = typeof data[property] === 'undefined' ? undefined : data[property];
        validate(`${modelName}.${property}`, model[property], value);
    }

    function validate(property, rule, value) {
        for (let prop in rule) {
            checkRule(prop, rule[prop]);
        }

        function checkRule(rule, ruleVal) {
            switch (rule) {
                case 'required':
                    if(ruleVal === true && typeof value === 'undefined'){
                        err.message = `${property} ${MESSAGE.REQUIRED_MESSAGE}`;
                        throw err;
                    }
                    break;
                case 'type':
                    ruleVal = typeof ruleVal === 'string' ? ruleVal : ruleVal.name;
                    if (typeof value !== ruleVal.toLowerCase()) {
                        err.message = `${property} ${MESSAGE.TYPE_MSG} ${ruleVal}`;
                        throw err;
                    }
                    break;
                default:
                    break;
            }
        }
    }
};
