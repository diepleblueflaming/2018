'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 02/06/2018 - 10:46
 */
// require Todo Model
const ToDo = require('models/todo');
const cache = require('middlewares/cache/');
module.exports = {
    getAll: async function (req, res, next) {
        try {
            res.locals.data = await ToDo.get();
            cache.setCache(req.originalUrl, res.locals.data);
            next();
        } catch (e) {
            next(e)
        }
    },

    getOne: async function (req, res, next) {
        let name = req.params.name;
        try {
            res.locals.data = await ToDo.getByName(name);
            next();
        } catch (e) {
            next(e);
        }
    },

    create: async function (req, res, next) {
        let todo = req.body;
        try {
            res.locals.data = await ToDo.create(todo);
            next();
        } catch (e) {
            next(e);
        }
    },

    /**
     * update a todo by id
     * @param req, res, next
     * @return {Promise.<void>}
     */
    update: async function (req, res, next) {
        let todo = req.body;
        try {
            res.locals.data = await ToDo.updateById(todo);
            next();
        } catch (e) {
            next(e);
        }
    },

    /**
     * @description delete toto by id
     * @param req, res, next
     * @return {Promise.<void>}
     */
    deleteById: async function (req, res, next) {
        try {
            let id = req.params.id;
            res.locals.data = await ToDo.deleteById(id);
            next();
        } catch (e) {
            next(e);
        }
    },

    /**
     * @description delete todo by title
     * @param req, res, next
     * @return {Promise.<void>}
     */
    deleteByTitle: async function (req, res, next) {
        try {
            let title = req.params.title;
            res.data.locals = await ToDo.deleteByTitle(title);
            next();
        } catch (e) {
            next(e);
        }
    }
};
