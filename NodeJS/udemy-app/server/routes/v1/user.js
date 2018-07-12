'use strict';
/**
 *
 * user router
 */
const User = require('controllers/User');
const authenticator = require('middlewares/authentication/');
const acl = require('middlewares/role-based');
module.exports = function (express) {
    // initial an router instance
    const router = express.Router();

    // POST login
    router.post('/login', User.login);

    // authenticate for all user request except login.
    router.use(/^((?!login).)*$/, [authenticator.authenticate, acl.middleware()]);

    // GET Logout
    router.get('/logout', User.logout);

    // GET/ get all
    router.get('/', User.getAll);

    // POST/ create new user
    router.post('/', User.create);

    return router;
};
