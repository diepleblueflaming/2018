"use strict";
/**
 * Project: NodeJS-Master-Class
 * Author: Le Hai Diep(dieple)
 * Date-Time: 22/12/2018-15:17
 */

import FileHelper from './FileHelper';
import {deleteProperty} from '../utils';

const STORAGE_FILE = 'data/storage.json';
const storage = {};


storage.setItem = async function (key, value) {
	value = typeof value === 'string' ? value : JSON.stringify(value);
	let data = await FileHelper.readFile(STORAGE_FILE, {jsonMode: true});
	if(typeof data === 'object') {
		data[key] = value;
	}else {
		data = {};
		data[key] = value;
	}
	await FileHelper.writeFile(STORAGE_FILE, data);
};


storage.getItem = async function (key) {
	const data = await FileHelper.readFile(STORAGE_FILE, {jsonMode: true});
	return typeof data === 'object' && data.hasOwnProperty(key) ? data[key] : null;
};

storage.removeItem = async function (key) {
	try {
		const oldData = await FileHelper.readFile(STORAGE_FILE, {jsonMode: true});
		const newData = deleteProperty(oldData, key);
		await FileHelper.writeFile(STORAGE_FILE, newData);
	}catch (e) {
		console.error('Cannot remove this key from Storage !', e);
	}
};

export default storage;
