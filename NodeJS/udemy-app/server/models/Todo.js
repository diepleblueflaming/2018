"use strict";
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 02/06/2018 - 07:25
 */
const commonHelper = require('helpers/common');
const {ObjectId} = require("mongodb");
const Todo = {
    TodoCollection: function () {
        return process.db.collection('todo');
    },
    get: function () {
        return this.TodoCollection().find({}).toArray();
    },
    getByName: function (name) {
        return this.TodoCollection().findOne({title: name});
    },
    create: function (toto) {
        return this.TodoCollection().insertOne(toto);
    },
    updateById: async function (todo) {
        let id = todo._id;
        delete todo._id;
        return this.TodoCollection().findOneAndUpdate({
            _id: new ObjectId(id)
        },{
            $set: todo
        },{
            returnOriginal:false
        });
    },

    deleteById: function (id) {
        return this.TodoCollection().deleteOne({_id: new ObjectId(id)});
    },

    deleteByTitle: function (title) {
        return this.TodoCollection().deleteMany({title: title});
    }
};
module.exports = Todo;
