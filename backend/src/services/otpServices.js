// In routes/auth.js or similar
const express = require("express");
const router = express.Router();
const { sendOTP, verifyOTP } = require("../services/otpService");
const ADMIN_EMAIL = process.env.ADMIN_EMAIL; // Admin email from environment variables

// Send OTP
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  if (email !== ADMIN_EMAIL) {
    return res.status(403).json({ message: "Unauthorized email address" });
  }

  try {
    const result = await sendOTP(email);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error sending OTP", error: err.message });
  }
});

// Verify OTP
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  if (email !== ADMIN_EMAIL) {
    return res.status(403).json({ message: "Unauthorized email address" });
  }

  try {
    const isValid = await verifyOTP(email, otp);
    if (isValid) {
      res.status(200).json({ message: "OTP verified successfully" });
    } else {
      res.status(401).json({ message: "Invalid OTP" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error verifying OTP", error: err.message });
  }
});

module.exports = router;
