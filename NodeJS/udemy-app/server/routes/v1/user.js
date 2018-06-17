"use strict";
/**
 *
 * user router
 */
const User = require("controllers/User");

module.exports = function (express) {
    // initial an router instance
    const router = express.Router();

    // GET/ get all
    router.get('', User.getAll);

    // POST/ create new user
    router.post('/', User.create);

    // POST login
    router.post('/login', User.login);
    return router;
};
