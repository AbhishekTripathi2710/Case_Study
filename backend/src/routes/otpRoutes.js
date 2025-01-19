const express = require('express')
const { sendOtp, verifyOtp } = require("../controllers/apiControllers");

const router = express.Router();

router.post("/send", sendOtp);
router.post("/validate", verifyOtp);

module.exports = router;
