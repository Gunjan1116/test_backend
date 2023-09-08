const express = require("express");
const router = express.Router();
const { verifyToken, loginUser } = require("../controllers/authController");
const { loginUserRegistration } = require("../controllers/userController");

// Verify token endpoint
router.get("/verify-token", verifyToken, (req, res) => {
  // You can access the user data in req.user and send it in the response
  const userData = req.user;
  res.json({ user: userData });
});

// User login endpoint for registration purposes
router.post("/login", loginUser);
// User login endpoint for login purposes
router.post("/login-registration", loginUserRegistration);

module.exports = router;
