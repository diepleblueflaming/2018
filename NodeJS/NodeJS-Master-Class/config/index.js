"use strict";
/**
 * Project: NodeJS-Master-Class
 * Author: Le Hai Diep(dieple)
 * Date-Time: 17/11/2018-18:43
 */
const environments = {};

environments.staging = {
	httpPort: 3000,
	httpsPort: 3001,
	envName: 'staging'
};

environments.production = {
	httpPort: 8888,
	httpsPort: 9999,
	envName: 'production'
};

const currentEnvironments = typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : '';
const environmentToExport = typeof environments[currentEnvironments] === 'object' ?
															environments[currentEnvironments] :
															environments['staging'];
export default environmentToExport;