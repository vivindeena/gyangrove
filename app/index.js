require("dotenv").config({ path: "../setups/.env" }); 
const express = require("express");
const cors = require("cors");
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const injest = require("./routes/injest");
const events = require("./routes/events");
const db = require("./db/db");

process.env.TZ = "UTC";

app.get("/", (req, res) => {
	const client = db.dbUserPool.connect();
	if(!client){
		return res.status(500).json({
			message: "Database connection failed",
		});
	}
	res.status(200).json({
		data: "Namaste! Route is reachable, Check documentation for more info",
	});
});

app.use("/api/injest", injest);
app.use("/api/events", events);

app.listen(process.env.PORT, () => {
	console.log(`Listening on port ${process.env.PORT}`);
});
