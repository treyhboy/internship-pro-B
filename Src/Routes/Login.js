const express = require("express");
var router = express.Router();
const createToken = require("../../Utils/Token.js");
const passport = require("../../Config/Passport/Passport.js");

router.post(
  "/add",
  passport.authenticate("local-signup", function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.send({ token: createToken(req.user) });
  })
);
router.post("/login", passport.authenticate("local-login"), function(req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  res.send({ token: createToken(req.user) });
});

module.exports = router;
