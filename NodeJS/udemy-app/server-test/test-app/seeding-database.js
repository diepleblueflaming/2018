"use strict";
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 17/06/2018 - 05:48
 */
const {ObjectId} = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salt = bcrypt.genSaltSync(10);

const users = [
    {
        _id: new ObjectId(),
        email: 'jane@gmail.com',
        password: bcrypt.hashSync('123456', salt),
        role: 'customer',
        tokens: [
            {
                access: new Date().getTime(),
                token: jwt.sign({email: 'jane@gmail.com'}, 'jwt-secret-key')
            }
        ]
    },
    {
        _id: new ObjectId(),
        email: 'scarlet-johansson@gmail.com',
        password: bcrypt.hashSync('123456', salt),
        role: 'customer',
        tokens: [
            {
                access: new Date().getTime(),
                token: jwt.sign({email: 'scarlet-johansson@gmail.com'}, 'jwt-secret-key')
            }
        ]
    }
];

const todos = [
    {
        "_id": ObjectId(),
        "title": "Learning MongoDB",
        "priority": 1
    },
    {
        "_id": ObjectId(),
        "title": "Learning NodeJS",
        "priority": 1
    },
    {
        "_id": ObjectId(),
        "title": "Learning React",
        "priority": 1
    },
    {
        "_id": ObjectId(),
        "title": "Learning Css",
        "priority": 2
    },
    {
        // specify id for this todo to test delete todo
        '_id': ObjectId('5b38497d9aa82679fdc59dc8'),
        "title": "Learning Angular",
        "priority": 2
    }
];

module.exports = {users, todos};
