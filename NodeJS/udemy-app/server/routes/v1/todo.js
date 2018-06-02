"use strict";
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 02/06/2018 - 08:37
 */
const Todo = require("controllers/Todo");
module.exports = function (express) {
    // initial an router instance
    const router = express.Router();

    // GET get all todo
    router.get('/', Todo.getAll);

    // GET ONE
    router.get('/:name', Todo.getOne);

    // POST Todo
    router.post('/', Todo.create);
    return router;
};
