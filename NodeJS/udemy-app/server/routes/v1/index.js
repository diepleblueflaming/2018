'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 02/06/2018 - 13:28
 */
const express = require('express');
const router = express.Router();

const auth = require('routes/v1/auth');
router.use('/auth', auth);

const user = require('routes/v1/user');
router.use('/user', user);

const todo = require('routes/v1/todo');
router.use('/todo', todo);

exports = module.exports = router;
