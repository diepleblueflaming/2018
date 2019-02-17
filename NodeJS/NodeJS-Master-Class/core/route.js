"use strict";
/**
 * Project: NodeJS-Master-Class
 * Author: Le Hai Diep(dieple)
 * Date-Time: 22/11/2018-05:36
 */
import {trimSlash, isRegex, generateToken} from "../utils";
import url from "url";

export default class Route {

	constructor() {
		this.layers = [];
	}

	use() {
		const object = this.parseParams(arguments, '(\\w*)');
		if (typeof object.handler === 'function') {
			this.layers.push(object);
		} else if (object.handler instanceof Route) {
			// current solution: merge all item of sublayer into parent layer
			object.handler.layers[0].previousId = object.previousId;
			object.handler.layers.forEach((item) => {
				item.path = object.path + item.path;
				this.layers.push(item);
			});
		}
	}

	get() {
		this.layers.push(this.parseParams(arguments, 'GET'));
	}

	post() {
		this.layers.push(this.parseParams(arguments, 'POST'));
	}

	put() {
		this.layers.push(this.parseParams(arguments, 'PUT'));
	}

	delete() {
		this.layers.push(this.parseParams(arguments, 'DELETE'));
	}

	all() {
		this.layers.push(this.parseParams(arguments, '(\\w*)'));
	}

	parseParams(args, httpMethod) {
		const params = Array.from(args);
		let path = '(.*)',
			handler = null,
			// regex = /^(.*)$/,
			name = '';

		// if arguments'length = 1
		if (params.length === 1) {
			if (!Route.isValidHandler(params[0])) {
				throw new Error('Parameters is invalid');
			}
			handler = params[0];
		}
		// if arguments'length = 2
		if (params.length === 2) {
			if (Route.isValidPath(params[0]) && Route.isValidHandler(params[1])) {
					path = params[0];
				// regex = isRegex(params[0]) ? params[0] : this.convertStringToRegex(params[0], httpMethod);
				handler = params[1];
			} else if (Route.isValidHandler(params[0]) && Route.isValidName(params[1])) {
				handler = params[0];
				name = params[1];
			} else {
				throw new Error('Parameters is invalid');
			}
		}
		// if arguments'length = 3
		if (params.length === 3) {
			if (
				Route.isValidPath(params[0]) &&
				Route.isValidHandler(params[1]) &&
				Route.isValidName(params[2])
			) {
					path = params[0];
				// regex = isRegex(params[0]) ? params[0] : this.convertStringToRegex(params[0], httpMethod);
				handler = params[1];
				name = params[2];
			} else {
				throw new Error('Parameters is invalid');
			}
		}
		const id = generateToken(5);
		const previousId = this.findPreviousFncId(this.layers);
		return {id, previousId, path, name, handler, httpMethod};
	}

	static parseURL(req, res) {
		const parseURL = url.parse(req.url);
		const trimmedPath = trimSlash(parseURL.path);
		const httpMethod = req.method.toLowerCase();
		return `${httpMethod.toUpperCase()}/${trimmedPath}`;
	};

	findPreviousFncId(layers) {
		let result = '';
		let i = 0;
		for (i; i < layers.length; i++) {
			if (typeof layers[i].handler === 'function') {
				result = layers[i].id;
			}
			else if (Array.isArray(layers[i].handler)) {
				result = this.findPreviousFncId(layers[i].handler);
			}
		}
		return result;
	}

	static isValidPath(path) {
		return typeof path === 'string' || isRegex(path);
	}

	static isValidHandler(handler) {
		return typeof handler === 'function' || handler instanceof Route;
	}

	static isValidName(name) {
		return typeof name === 'string';
	}
}