'use strict';
/**
 *
 * user router
 */
const User = require('controllers/user');
const authenticator = require('middlewares/authentication/');
const acl = require('middlewares/roleBased/');
module.exports = function (express) {
    // initial an router instance
    const router = express.Router();

    // POST login
    router.post('/login', User.login.bind(User));

    // authenticate for all user request except login.
    router.use(/^((?!login).)*$/, [authenticator.authenticate, acl.middleware()]);

    // GET Logout
    router.get('/logout', User.logout.bind(User));

    // GET/ get all
    router.get('/', User.getAll.bind(User));

    // POST/ create new user
    router.post('/', User.create.bind(User));

    router.delete('/:email', User.delete.bind(User));

    return router;
};
