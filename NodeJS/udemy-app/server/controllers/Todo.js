"use strict";
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 02/06/2018 - 10:46
 */
// require Todo Model
const ToDo = require("models/Todo");
module.exports = {
    getAll: async function (req, res, next) {
        try {
            let result = await ToDo.get();
            res.json(result);
        } catch (e) {
            next(e)
        }
    },

    getOne: async function (req, res, next) {
        let name = req.params.name;
        try {
            let r = await ToDo.getByName(name);
            res.json(r);
        } catch (e) {
            next(e)
        }
    },

    create: async function (req, res, next) {
        let todo = req.body;
        try {
            let result = await ToDo.create(todo);
            res.json(result);
        } catch (e) {
            next(e)
        }
    }
};
