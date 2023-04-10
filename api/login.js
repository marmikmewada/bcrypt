const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../server/users.js");

router.post("/login", async (req, res) => {
  try {
    // Check if email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password.");

    // Check if password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    // Generate token and send it in response
    const token = jwt.sign({ id: user._id }, "secretkey");
    res.header("Authorization", "Bearer " + token).send("Logged in successfully!");
  } catch (err) {
    console.log(err);
    res.status(400).send("Error during login.");
  }
});

module.exports = router;
