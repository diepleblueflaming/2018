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

export default router;