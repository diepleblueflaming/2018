"use strict";
/**
 * Project: NodeJS-Master-Class
 * Author: Le Hai Diep(dieple)
 * Date-Time: 18/11/2018-12:39
 */
import fs from 'fs';
import path from 'path';

const FileHelper = {};
const fsPromise = fs.promises;

FileHelper.open = function () {

};

FileHelper.createDir = async function (path) {
	try {
		await fsPromise.mkdir(path, {
			recursive: true
		})
	} catch (e) {
		this.onError(e);
	}
};

FileHelper.readFile = async function (pathFile, options) {
	// console.log(path.resolve(pathFile));
	const jsonMode = (options && options.jsonMode) || false;
	try {
		// Using fs.access() to check for the accessibility of a file before calling
		// fs.open(), fs.readFile() or fs.writeFile() is not recommended.
		const data = await fsPromise.readFile(pathFile);
		return jsonMode ? JSON.parse(data) : data;
	} catch (e) {
		this.onError(e);
	}
};

FileHelper.writeFile = async function (pathToFile, data) {
	const dataToWrite = FileHelper.isJson(data) ? data : (typeof data === 'object' ? JSON.stringify(data) : '');
	try {
		if (!dataToWrite) {
			throw Error('data must be a json string or object');
		}
		const directDir = path.dirname(pathToFile);
		await this.createDir(directDir);
		await fsPromise.writeFile(pathToFile, dataToWrite);
	} catch (e) {
		this.onError(e);
	}
};

FileHelper.isExistDirectory = async function (path) {
	let result;
	try {
		await fsPromise.realpath(path);
		result = true;
	} catch (e) {
		result = false
	}
	return result;
};

FileHelper.removeFile = async function (path) {
	try {
		await fsPromise.unlink(path)
	} catch (e) {
		this.onError(e);
	}
};

/**
 * open file to append data, create new if not exist
 * @param filePath
 * @param data
 */
FileHelper.appendToFile = async function (filePath, data) {
	return fsPromise.appendFile(filePath, data).
	catch(FileHelper.onError);
};

FileHelper.onError = function (e) {
	const error = {
		message: e.message,
		stack: e.stack,
		module: 'FileSystem Module'
	};
	return Promise.reject(error);
};

FileHelper.isJson = function (str) {
	let result = true;
	try {
		JSON.parse(str);
		result = true;
	} catch (e) {
		result = false;
	}
	return typeof str === 'string' && result;
};
export default FileHelper;