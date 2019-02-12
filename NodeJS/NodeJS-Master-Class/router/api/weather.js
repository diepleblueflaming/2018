"use strict";
/**
 * Project: NodeJS-Master-Class
 * Author: Le Hai Diep(dieple)
 * Date-Time: 10/02/2019-19:24
 */

import Route from '../../core/route';
import Weather from '../../controllers/Weather';

const router = new Route();

// weather module route
router.get('/:cityname', Weather.get);

export default router;