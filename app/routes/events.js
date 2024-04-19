const router = require("express").Router();
const findController = require("../controllers/eventController");

router.route("/find").post(findController.find);

module.exports = router;
