const router = require("express").Router();
const  injestController = require("../controllers/injestController");

const multer = require("multer");

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, "tmp"),
	filename: (req, file, cb) => cb(null, `${file.originalname}`),
});

const upload = multer({ storage: storage });

router.route("/add").post(upload.single('csvFile'), injestController.injestFromCSV);

router.route("/append").post(upload.single('csvFile'), injestController.injestFromCSVAppend);

module.exports = router;
