require("dotenv").config({ path: "../setups/.env" }); 
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const injest = require("./routes/injest");
const find = require("./routes/find");

app.get("/", (req, res) => {
	res.status(200).json({
		data: "Namaste! Route is reachable, Check documentation for more info",
	});
});

app.use("/api/injest", injest);
app.use("api/find", find);

app.listen(process.env.PORT, () => {
	console.log(`Listening on port ${process.env.PORT}`);
});
