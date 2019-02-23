"use strict";
/**
 * Project: NodeJS-Master-Class
 * Author: Le Hai Diep(dieple)
 * Date-Time: 19/02/2019-21:20
 */

import cluster from 'cluster';
import os from 'os';
import util from 'util';
const debug = util.debuglog('process');

const cpus = os.cpus().length;

const ClusterHelper = {};

ClusterHelper.init = function (callback) {

	// if(cluster.isMaster) {
	// 	debug('\x1b[33m%s\x1b[0m', 'The Master process started at ' + process.pid);
	//
	// 	// spawn worker process;
	// 	for (let i = 0; i < cpus; i++) {
	// 		cluster.fork();
	// 	}
	//
	// 	cluster.on('exit', (worker, code, signal) => {
	// 		console.log(`worker ${worker.process.pid} died`);
	// 	});
	// }else {
	// 	debug('\x1b[33m%s\x1b[0m', 'The worker process started at ' + process.pid);
	// 	callback();
	// }

	callback();
};

export  default ClusterHelper;