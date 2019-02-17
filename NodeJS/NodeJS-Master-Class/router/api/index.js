"use strict";
/**
 * Project: NodeJS-Master-Class
 * Author: Le Hai Diep(dieple)
 * Date-Time: 25/11/2018-21:07
 */

import Route from '../../core/route';
import Authentication from '../../controllers/Authentication';
import User from '../../controllers/User';
import weather from './weather';
import Log from "../../lib/Log";
import responseParser from "../../middlewares/responseParser";

const router = new Route();

// common route
router.post('/login', Authentication.login);
router.get('/logout', Authentication.logout);


// user module route
router.get('/user/', User.getAll);
router.get('/user/:id([\\d|\\w|-]+)', User.get);
router.post('/user', User.add);
router.put('/user', User.update);
router.delete('/user/:id', User.delete);

router.use('/weather', weather);


// common handler
// Resource Not Found
router.use(function (req, res, next) {
	res.body = {statusCode: 404, msg: 'Resource Not Found'};
	next('end-request');
});

/******************** Error Handling ****************/
// router.use(function (req, res, next, error) {
// 	const log = `Unhandled Rejection\n${error.stack}`;
// 	Log.logFile(log);
// 	res.body = {statusCode: 500, msg: 'Internal Server Error', data: null};
// 	next('end-request');
// });
/******************** Error Handling ****************/

// send final response
router.use(responseParser, 'end-request');
/******************** Define middleware ****************/

export default router;