"use strict";
/**
 *
 * user router
 */

module.exports = function (express) {
    // initial an router instance
    const router = express.Router();

    // GET get all user
    router.get('/', function (req, res) {
        res.json({
            name: 'diepledev',
            majors: ['JS', 'PHP', 'CSS', 'HTML']
        });
        res.end();
    });


    return router;
};
