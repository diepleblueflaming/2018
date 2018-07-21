'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 02/06/2018 - 06:31
 */
const {MongoClient} = require('mongodb');
const commonHelper = require('helpers/common');
const MESSAGE = require('constant/message/en.json');
const APP_CONSTANT = require('constant/appConstants.json');

const connectPromise = MongoClient.connect(APP_CONSTANT['MONGODB_CONNECT_URL']);
process.db = null;

connectPromise.then((database) => {
    let dbName = '';
    switch (process.env.NODE_ENV) {
        case 'testing':
            dbName = APP_CONSTANT['MONGODB_DB_TEST_NAME'];
            break;
        case 'development':
        case 'production':
        default:
            dbName = APP_CONSTANT['MONGODB_DB_NAME'];
            break;
    }
    process.db = database.db(dbName);
    commonHelper.log(MESSAGE['MONGODB_CONNECT_SUCCESS']);
}).catch(err => {
    commonHelper.log(MESSAGE['MONGODB_CONNECT_FAILED'] + err);
    process.exit(1);
});
