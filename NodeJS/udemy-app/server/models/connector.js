'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 02/06/2018 - 06:31
 */
const {MongoClient} = require('mongodb');
const {log} = require('helpers/common');
const MESSAGE = require('constant/message/en.json');

const connectPromise = MongoClient.connect(process.env.MONGODB_URI);
process.db = null;

connectPromise.then((database) => {
	process.db = database.db(process.env.DB_NAME);
	log(MESSAGE['MONGODB_CONNECT_SUCCESS']);
}).catch(err => {
	log(MESSAGE['MONGODB_CONNECT_FAILED'] + err);
    process.exit(1);
});
