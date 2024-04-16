const csv = require("csv-parser");
const fs = require("fs");

const db = require("../db/db");
const format = require("pg-format");


async function readFile(file) {
	const result = [];
	console.log(file);
	console.log(process.cwd());

	await new Promise((resolve, reject) => {
		fs.createReadStream(file.path)
			.pipe(csv())
			.on("data", (data) => result.push(data))
			.on("end", () => {
				fs.unlinkSync('./'+file.path);
				resolve();
			})
			.on("error", (err) => reject(err));
	});
	const insertValues = result.map((item) => [
		item.event_name,
		item.city_name,
		item.date,
		item.time,
		parseFloat(item.latitude), // Convert latitude to float
		parseFloat(item.longitude), // Convert longitude to float
	]);
	return insertValues;
}

const injestFromCSV = async (req, res) => {
	if (!req.file) {
		return res.status(400).send("No file uploaded.");
	}
	const result = await readFile(req.file);
	let client;
	try {
		client = await db.dbUserPool.connect();
		await client.query("BEGIN");

		const deleteQuery = "DELETE FROM events where 1=1";

		const deleteRes = await client.query(deleteQuery);
		if (deleteRes.rowCount < 0) {
			await client.query("ROLLBACK");
			return res.status(500).json({
				message: "Error deleting existing events. Try again later.",
			});
		}

		const insertQuery = format(
			"INSERT INTO events (event_name, city_name, event_date, event_time, latitude, longitude) VALUES %L;",
			result
		);
		const insertRes = await client.query(insertQuery);		

		await client.query("COMMIT");
		return res.status(200).json({
			message: "Events added successfully",
		});

	} catch (error) {
		await client.query("ROLLBACK");
		console.log(error);
		return res.status(500).json({
			message: "Database error occurred, Try again later.",
		});
	} finally {
		client.release();
	}
}

const injestFromCSVAppend = async(req, res)  => {
	if (!req.file) {
		return res.status(400).send("No file uploaded.");
	}
	const result = await readFile(req.file);
	let client;
	try {
		client = await db.dbUserPool.connect();
		await client.query("BEGIN");

		const insertQuery = format(
			"INSERT INTO events (event_name, city_name, event_date, event_time, latitude, longitude) VALUES %L;",
			result
		);
		const insertRes = await client.query(insertQuery);

		await client.query("COMMIT");
		return res.status(200).json({
			message: "Events added successfully",
		});
	} catch (error) {
		await client.query("ROLLBACK");
		console.log(error);
		return res.status(500).json({
			message: "Database error occurred, Try again later.",
		});
	} finally {
		client.release();
	}
};

module.exports = {
	injestFromCSV, 
	injestFromCSVAppend
};
