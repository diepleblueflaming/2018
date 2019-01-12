'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 29/07/2018 - 21:37
 */
const express = require('express');
const Authentication = require('controllers/authentication');
const {authenticate} = require('middlewares/authentication/');
const authSchema = require('middlewares/validations/auth');
const {validation} = require('untils/untils');

const router = express.Router();

// POST login
router.post('/login', validation(authSchema), Authentication.login);

// authenticate for all user request except login.
router.use(/^\/logout\/?$/, authenticate);

// GET Logout
router.get('/logout', validation(authSchema), Authentication.logout);

module.exports = router;
