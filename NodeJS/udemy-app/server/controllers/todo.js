'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 02/06/2018 - 10:46
 */
// require Todo Model
const ToDo = require('models/todo');
const cache = require('middlewares/cache/');
const {
	bindDataToResponse,
	checkDbResponse
} = require('untils/untils');

module.exports = {
    getAll: async function (req, res, next) {
        try {
	        let todos = await ToDo.get();
	        let responseObj = bindDataToResponse({
		        res,
		        data: todos,
		        msg: 'SUCCESS',
		        type: 'GET'
	        });
	        cache.setCache(req, responseObj);
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
