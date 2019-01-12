'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 02/06/2018 - 08:37
 */
const express = require('express');
const Todo = require('controllers/todo');
const cache = require('middlewares/cache/');
const {authenticate} = require('middlewares/authentication/');
const acl = require('middlewares/roleBased/');

// initial an router instance
const router = express.Router();

router.all('/', [authenticate, acl.middleware]);

// GET get all todo
router.get('/', cache.middleware, Todo.getAll.bind(Todo));

// GET ONE
router.get('/:name', Todo.getOne.bind(Todo));

// POST Todo
router.post('/', Todo.create.bind(Todo));

// UPDATE
router.put('/', Todo.update.bind(Todo));

// DELETE by Id
router.delete('/:id', Todo.deleteById.bind(Todo));

// DELETE by Title
router.delete('/title/:title', Todo.deleteByTitle.bind(Todo));

module.exports = router;
