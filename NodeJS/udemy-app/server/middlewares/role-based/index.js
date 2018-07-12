'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 09/07/2018 - 05:56
 */
const acl = require('acl');
const redisClient = require('redis').createClient();
const commonHelper = require('helpers/common');
let aclRedis = new acl.redisBackend(redisClient);
const aclObj = new acl(aclRedis);
const accessControlList = {
    /**
     * @return Promise
     */
    setRole: function () {
        return aclObj.allow([
            {
                roles: ['admin'],
                allows: [
                    {resources: ['/todo', '/user'], permissions: '*'},
                ]
            },
            {
                roles: ['customer'],
                allows: [
                    {resources: '/todo', permissions: ['put']},
                    {resources: '/user', permissions: 'get'}
                ]
            }
        ]);
    },

    middleware: function () {
        return aclObj.middleware(1, (req, res) => {
            return res.userLogged.hasOwnProperty('_id') ? res.userLogged._id : '';
        });
    },

    logPermission: function (userId, role) {
        aclObj.allowedPermissions(userId, role, (err, obj) => {
            commonHelper.logObjectPretty(obj);
        });
        aclObj.roleUsers(role, (err, res) => commonHelper.logObjectPretty(res));
    },

    setUserRole: function (userId, role) {
        if (typeof role === 'object' && role.length) {
            // do something
        }
        return aclObj.addUserRoles(userId, role);
    }
};
accessControlList.setRole();
module.exports = accessControlList;
