'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 02/06/2018 - 07:57
 */

const {ObjectId} = require('mongodb');
const flat = require('./flatObject');
const _ = require('lodash');

module.exports = {
    log: function (string) {
	    if (['testing', 'development'].includes(process.env.NODE_ENV)) {
            console.log(string);
        }
    },

    logPrettyObject: function (obj) {
	    if (['testing', 'development'].includes(process.env.NODE_ENV)) {
            console.log(JSON.stringify(obj, undefined, 2));
        }
    },

	instanceOf: function (instance, constructorName, Obj) {
        let condition = instance.constructor.name === constructorName;
		if (Obj !== undefined) {
			condition = condition || instance instanceof Obj;
        }
        return condition;
    },

	ObjectId: function (_id) {
		return new ObjectId(_id);
	},

	flatObject: function (obj) {
		return flat(obj);
    },

	unFlatObject: function (obj) {
		return flat.unflatten(obj);
    },

	isDevelopment: function () {
		return ['development', 'testing'].includes(process.env.NODE_ENV);
    }
};
