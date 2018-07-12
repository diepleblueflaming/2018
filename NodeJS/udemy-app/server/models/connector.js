'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 02/06/2018 - 06:31
 */
const MongoClient = require('mongodb').MongoClient;
const CONNECT_URL = 'mongodb://localhost:27017/';
const connectPromise = MongoClient.connect(CONNECT_URL);
const dbName = process.env.NODE_ENV === 'development' ? 'udemy-app' : 'udemy-app-test';
const commonHelper = require('helpers/common');
const MESSAGE = require('constant/message/en.json');
process.db = null;
connectPromise.then((database) => {
    process.db = database.db(dbName);
    commonHelper.log(MESSAGE.MONGODB_CONNECT_SUCCESS);
}).catch(err => {
    commonHelper.log(MESSAGE.MONGODB_CONNECT_FAILED + err);
});
