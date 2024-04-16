const router = require("express").Router();
const  injestController = require("../controllers/injestController");

const multer = require("multer");

const upload = multer({ dest: 'uploads/' });

router.route("/add").post(upload.single('csvFile'), injestController.injestFromCSV);

router.route("/append").post(upload.single('csvFile'), injestController.injestFromCSVAppend);

module.exports = router;
