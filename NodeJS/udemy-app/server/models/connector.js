"use strict";
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 02/06/2018 - 06:31
 */
const MongoClient = require('mongodb').MongoClient;
const CONNECT_URL = 'mongodb://localhost:27017/';
const connectPromise = MongoClient.connect(CONNECT_URL);
process.db = null;
connectPromise.then((database) => {
    process.db = database.db('udemy-app');
    console.log('Connecting to MongoDB successfully !!!');
}).catch(err => {
    console.log('Unable to connect to MongoDB');
    throw err;
});
