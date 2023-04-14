const express = require("express");
const router = express.Router();
const resetController = require("../controllers/resetController");

router.post("/", resetController.handleResetPassword);

module.exports = router;
