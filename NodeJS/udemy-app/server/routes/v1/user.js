'use strict';
/**
 *
 * user router
 */
const express = require('express');
const User = require('controllers/user');
const {authenticate} = require('middlewares/authentication/');
const acl = require('middlewares/roleBased/');
const {validation, commonValidation} = require('untils/untils');
const userSchema = require('middlewares/validations/user');

// initial an router instance
const router = express.Router();

// check authentication and role for all routes
router.all('*', [commonValidation(), authenticate, acl.middleware]);

// GET/ get all
router.get('/', validation(userSchema), User.getAll);

// POST/ create new user
router.post('/', validation(userSchema), User.create);

// PUT/ update user
router.put('/', validation(userSchema), User.update);

// DELETE/:email delete an user by email
router.delete('/:email', validation(userSchema), User.remove);

module.exports = router;
