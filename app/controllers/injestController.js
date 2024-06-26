const csv = require("csv-parser");
const fs = require("fs");

const { dbUserPool } = require("../db/db");
const format = require("pg-format");


async function readFile(file) {
	const result = [];
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
		return res.status(400).send("Missing Params");
	}
	const result = await readFile(req.file);
	let client;
	try {
		client = await dbUserPool.connect();
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
			"INSERT INTO events (event_name, city_name, event_date, event_time, latitude, longitude) VALUES %L RETURNING ID;",
			result
		);
		const insertRes = await client.query(insertQuery);		
		await client.query("COMMIT");
		return res.status(200).json({
			message: "Events added successfully",
			total_rows: `${insertRes.rows.length}`,
		});

	} catch (error) {
		await client.query("ROLLBACK");
		console.log(error);
		return res.status(500).json({
			message: "Database error occurred, Try again later.",
			error: error.message,
		});
	} finally {
		client.release();
	}
}

const injestFromCSVAppend = async(req, res)  => {
	if (!req.file) {
		return res.status(400).send("Misssing Params");
	}
	const result = await readFile(req.file);
	let client;
	try {
		client = await dbUserPool.connect();
		await client.query("BEGIN");

		const insertQuery = format(
			`WITH inserted_row AS ( 
				   INSERT INTO events (event_name, city_name, event_date, event_time, latitude, longitude) 
				   VALUES %L RETURNING id 
				) 
				SELECT id, (SELECT COUNT(*) FROM events) AS total_rows FROM inserted_row;`,
			result
		);

		const insertRes = await client.query(insertQuery);
		await client.query("COMMIT");
		return res.status(200).json({
			message: "Events appended successfully",
			total_rows: insertRes.rows[0].total_rows,
		});
	} catch (error) {
		await client.query("ROLLBACK");
		console.log(error);
		return res.status(500).json({
			message: "Database error occurred, Try again later.",
			error: error.message,
		});
	} finally {
		client.release();
	}
};

module.exports = {
	injestFromCSV, 
	injestFromCSVAppend
};
