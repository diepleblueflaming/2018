'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 02/06/2018 - 08:37
 */
const Todo = require('controllers/Todo');
const validator = require('middlewares/validator/todo');
const cache = require('middlewares/cache/');
module.exports = function (express) {
    // initial an router instance
    const router = express.Router();

    // GET get all todo
    router.get('/', cache.middleware, Todo.getAll);

    // GET ONE
    router.get('/:name', Todo.getOne);

    // POST Todo
    router.post('/', validator, Todo.create);

    // UPDATE
    router.put('/', Todo.update);

    // DELETE by Id
    router.delete('/:id', Todo.deleteById);

    // DELETE by Title
    router.delete('/title/:title', Todo.deleteByTitle);
    return router;
};
