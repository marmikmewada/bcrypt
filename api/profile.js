const express = require("express");
const router = express.Router();
const User = require("../server/users.js");
const auth = require("../middleware/middleware.js");

router.get("/profile", auth, async (req, res) => {
  try {
    // Get the user from the database
    const user = await User.findById(req.userId).select("-password");

    // If the user doesn't exist, return an error
    if (!user) return res.status(404).send("User not found.");

    // Otherwise, return the user object
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error retrieving user.");
  }
});

module.exports = router;
