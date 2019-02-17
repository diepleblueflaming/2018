"use strict";
/**
 * Project: NodeJS-Master-Class
 * Author: Le Hai Diep(dieple)
 * Date-Time: 13/02/2019-21:47
 */
import FileHelper from '../lib/FileHelper';
import {trimSlash,getContentTypeByStaticType} from "../utils";

const BASE_STATIC_DIR = 'www';

const ServingStatic = {};

ServingStatic.serve = async function (req, res) {
	const resourcePath = trimSlash(req.url);
	const staticType = resourcePath.match(/\.(\w{2,4})$/)[1];
	const contentType = getContentTypeByStaticType(staticType);
	const realPath = `${BASE_STATIC_DIR}/${resourcePath}`;
	const content = await FileHelper.readStaticResource(realPath);
	const statusCode = content ? 200 : 404;
	res.writeHead(statusCode, {'Content-Type': contentType});
	res.end(content);
};

export default ServingStatic.serve;