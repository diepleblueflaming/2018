"use strict";
/**
 * Project: NodeJS-Master-Class
 * Author: Le Hai Diep(dieple)
 * Date-Time: 09/01/2019-04:45
 */
import FileHelper from './FileHelper';

const Log = {};
const LOG_FILE_EXT = '.txt';
const BASE_DIR_LOG = 'data/';
const separateLine = '-------------------------';
/**
 * log infomration to file
 * @param log string
 */
Log.logFile = async function (log) {
	// create file name by date time
	const now = new Date();
	const month = (now.getMonth() + 1).length > 1 ? (now.getMonth() + 1) : `0${(now.getMonth() + 1)}`;
	const date = now.getDate().length > 1 ? now.getDate() : `0${now.getDate()}`;
	const fileName = `${[now.getFullYear(), month, date].join('_')}${LOG_FILE_EXT}`;
	const filePath = `${BASE_DIR_LOG}${fileName}`;
	// append data to file
	const dateUTC = now.toUTCString();
	const logWrite = `${separateLine}\n${dateUTC}\n${log}\n${separateLine}\n\n`;
	FileHelper.appendToFile(filePath, logWrite).
	catch((error) => {
		console.log(error);
	});
};

export default Log;