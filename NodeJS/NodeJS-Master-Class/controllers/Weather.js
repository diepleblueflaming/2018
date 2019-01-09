"use strict";
/**
 * Project: NodeJS-Master-Class
 * Author: Le Hai Diep(dieple)
 * Date-Time: 06/01/2019-17:04
 */

/**
 *
 * @description Service given the city name an return weather information
 */
import cities from '../data/city.list.json';
import Request from '../lib/Request';


const Weather = {};
const appId = 'b6907d289e10d714a6e88b30761fae22';
const weatherApiBaseUrl = 'https://samples.openweathermap.org/data/2.5/weather';

Weather.get = async function (req, res, next) {
	const cityName = req.params.cityname;
	const city = cities.find((city) => city.name.toLowerCase() === cityName.toLowerCase());

	if(city === undefined) {
		res.body = {statusCode: 404, msg: 'Can\'t get weather of this city'};
	}else {
		try{
			const requestUrl = `${weatherApiBaseUrl}?id=${city.id}&appid=${appId}`;
			const weatherInfo = await Request.get(requestUrl);
			res.body = {statusCode: 200, msg: 'Successfully', data: weatherInfo.data};
		}catch (e) {
			res.body = {statusCode: e.statusCode, msg: '', data: null};
		}
	}
	next('end-request');
};

export default Weather;