const { dbUserPool } = require("../db/db");
const format = require("pg-format");
const { request } = require("axios");

const find = async(req, res) => {
    const { latitude, longitude, date, pageNo } = req.body;
    if(!latitude || !longitude || !date || !pageNo ) {
        return res.status(400).json({
            error: "Missing Params",
        });
    }
    let client;

    try {
		client = await dbUserPool.connect();
		const query = format(
			`WITH filtered_events AS (
				SELECT event_name, city_name, event_date, event_time, latitude, longitude
				FROM events
				WHERE event_date >= TO_DATE( %L , 'YYYY-MM-DD')
            	AND event_date <= TO_DATE( %L , 'YYYY-MM-DD') + INTERVAL '14 days'
				ORDER BY event_date ASC, event_time ASC 
			)
			SELECT *,(SELECT COUNT(*) FROM filtered_events) AS total_count
			FROM filtered_events
			LIMIT 10 OFFSET %L;`,
			date,
			date,
			(pageNo - 1) * 10
		);

		const data = await client.query(query);
		const totalEvents = data.rows[0].total_count;
		let promises = data.rows.map(async (element) => {
			element.date = element.event_date.toISOString().split("T")[0];
			delete element.event_date;
			let weatherPromise = find_weather(
				element.city_name,
				element.date
			);
			let distancePromise = find_distance(
				element.latitude,
				element.longitude,
				latitude,
				longitude
			);

			let [weatherData, distanceData] = await Promise.all([
				weatherPromise,
				distancePromise,
			]);
            element.weather = weatherData.weather;
			element.distance_km = distanceData.distance;
            delete element.latitude;
            delete element.longitude;
			delete element.total_count;
			return element;

		});

		let modifiedRows = await Promise.all(promises);

		res.status(200).json({
			events: modifiedRows,
			page: pageNo,
			pageSize: 10,
			totalEvents: totalEvents/1,
			totalPages: Math.ceil(totalEvents / 10),
		});
	} catch (error) {
        res.status(500).json({
			message: "Database error occurred, Try again later.",
			error: error.message,
		});
    } finally {
        client.release();
    }
}

async function find_weather(city_name, date) {
	let config = {
		method: "get",
		maxBodyLength: Infinity,
		url: `https://gg-backend-assignment.azurewebsites.net/api/Weather?code=KfQnTWHJbg1giyB_Q9Ih3Xu3L9QOBDTuU5zwqVikZepCAzFut3rqsg==&city=${city_name}&date=${date}`,
		headers: {},
	};
    try {
        const weather = await request(config);
        return weather.data;
    } catch (error) {
        console.log(error)
        return "Error fetching weather data";
    }

}

async function find_distance(lat1, lon1, lat2, lon2) {
    let config = {
		method: "get",
		maxBodyLength: Infinity,
		url: `https://gg-backend-assignment.azurewebsites.net/api/Distance?code=IAKvV2EvJa6Z6dEIUqqd7yGAu7IZ8gaH-a0QO6btjRc1AzFu8Y3IcQ==&latitude1=${lat1}&longitude1=${lon1}&latitude2=${lat2}&longitude2=${lon2}`,
		headers: {},
	};
    try {
        const distance = await request(config);
        return distance.data;
    } catch (error) {
        console.log(error);
        return "Error fetching distance data";
    }

}   

module.exports = {
    find
}