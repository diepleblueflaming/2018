'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 04/06/2018 - 17:33
 */
const validate = require('middlewares/validator/validate');
const Todo = {
    priority: {
        required: false,
        type: Number,
        validator: function () {}
    },
    title: {
        required: true,
        type: String
    }
};

module.exports = function (req, res, next) {
    try {
        validate('Todo', Todo, req.body);
        next();
    }catch (e){
        next(e);
    }
};
