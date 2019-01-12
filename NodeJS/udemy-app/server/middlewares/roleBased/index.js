'use strict';
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 09/07/2018 - 05:56
 */
const APP_CONSTANT = require('constant/appConstants.json');
const accessControlSpec = require('./accessControl.spec.json');
const acl = require('acl');
const commonHelper = require('helpers/common');
const redisClient = require('redis').createClient();
let aclRedis = new acl.redisBackend(redisClient);
const aclObj = new acl(aclRedis);

const accessControlList = {
    setRole: function () {
	    return aclObj.allow(accessControlSpec);
    },

	middleware: async function (req, res, next) {
		try {
			let userId = req.userLogged._id;
			userId = userId ? userId.toString() : '';
			let cb = aclObj.middleware(1, userId);
			cb(req, res, next);
		} catch (e) {
			next(e);
		}
    },

	logPermission: async function (userId, role) {
		try {
			let permission = aclObj.allowedPermissions(userId, role);
			commonHelper.logPrettyObject(permission);
			let userRole = await aclObj.roleUsers(role);
			commonHelper.logPrettyObject(userRole);
		} catch (e) {
			throw e;
		}
    },

	setUserRole: async function (userId, role) {
        if (typeof role === 'object' && role.length) {
            // do something
        }
		await this.removeAllUserRole(userId);
        return aclObj.addUserRoles(userId, role);
	},

	removeAllUserRole: async function (userId) {
		let aclUserKey = APP_CONSTANT['ACL_USER_PREFIX'] + userId;
		await redisClient.del(aclUserKey);
	}
};
accessControlList.setRole();
module.exports = accessControlList;
