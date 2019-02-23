"use strict";
/**
 * Project: NodeJS-Master-Class
 * Author: Le Hai Diep(dieple)
 * Date-Time: 17/02/2019-16:01
 */
const { performance,  PerformanceObserver} = require('perf_hooks');
import util from 'util';
const debug = util.debuglog('performance');

const Performance = {};

Performance.measure = async function (label, callback) {

	const startPoint = `${label}_start point`;
	const endPoint = `${label}_end point`;

	const obs = new PerformanceObserver((items) => {
		const measurement = items.getEntries()[0];
		debug('\x1b[33m%s\x1b[0m', measurement.name + ': ' + measurement.duration);
		performance.clearMarks(startPoint);
		performance.clearMarks(endPoint);
		obs.disconnect();
	});
	obs.observe({ entryTypes: ['measure'] });

	performance.mark(startPoint);
	const result = await callback();
	performance.mark(endPoint);
	performance.measure(label, startPoint, endPoint);

	return result;
};

export default Performance;
