const router = require("express").Router();
const findController = require("../controllers/findController");

router.route("/").post(findController.find);

module.exports = router;
