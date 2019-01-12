"use strict";
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 17/06/2018 - 10:03
 */
describe('Connection', function () {
    const {users, todos} = require('test-app/seeding-database');

    beforeEach(async function () {
        const db = await require('test-app/connect-database');
        const todoCollection = db.collection('todo');
        const userCollection = db.collection('user');
        await Promise.all([todoCollection.remove({}), userCollection.remove({})]);
        await Promise.all([todoCollection.insertMany(todos), userCollection.insertMany(users)]);
    });

    importTestScript('POST /user/login', 'test-app/login.test');
    importTestScript('Testing Todo module', 'test-app/todo.test');
});

function importTestScript(name, path) {
    describe(name, function () {
        require(path)(this);
    });
}
