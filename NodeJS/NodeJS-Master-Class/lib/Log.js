"use strict";
/**
 * Project: NodeJS-Master-Class
 * Author: Le Hai Diep(dieple)
 * Date-Time: 09/01/2019-04:45
 */
import FileHelper from './FileHelper';
import {getLogFileNameByDate}from '../utils';

const Log = {};
const LOG_FILE_EXT = '.txt';
const BASE_DIR_LOG = 'logs/';
const separateLine = '-------------------------';
/**
 * log infomration to file
 * @param log string
 */
Log.logFile = async function (log) {
	const fileName = `${getLogFileNameByDate()}${LOG_FILE_EXT}`;
	const filePath = `${BASE_DIR_LOG}${fileName}`;
	// append data to file
	const dateUTC = new Date().toUTCString();
	const logWrite = `${separateLine}\n${dateUTC}\n${log}\n${separateLine}\n\n`;
	FileHelper.appendToFile(filePath, logWrite).
	catch((error) => {
		console.log(error);
	});
};

export default Log;