"use strict";
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 02/06/2018 - 07:25
 */
const commonHelper = require('helpers/common');
const Todo = {
    TodoCollection: function () {
        return process.db.collection('ToDos');
    },
    get: function () {
        return this.TodoCollection().find({}).toArray();
    },
    getByName: function (name) {
        return this.TodoCollection().findOne({title: name});
    },
    create: function (toto) {
        return this.TodoCollection().insertOne(toto);
    }
};
module.exports = Todo;
