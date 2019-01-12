"use strict";
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 17/06/2018 - 06:16
 */
const MongoClient = require('mongodb').MongoClient;
const CONNECT_URL = 'mongodb://localhost:27017/';
const connectPromise = MongoClient.connect(CONNECT_URL);

module.exports = connectPromise.then((database) => {
    return database.db('udemy-app-test');
}).catch(err => {
    throw err;
});
