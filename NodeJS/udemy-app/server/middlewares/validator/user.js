'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 07/06/2018 - 06:02
 */
const validate = require('middlewares/validator/validate');
const User = {
    name: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    tokens: [{
        access: {
           type: String,
           required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
};

module.exports = function (req, res, next) {
    try {
        validate('User', User, req.body);
        next();
    }catch (e){
        next(e);
    }
};
