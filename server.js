//use connect-mongo for session storage in production
const express = require("express");
const path = require("path");
const session = require("express-session");
const cp = require("cookie-parser");
const bp = require("body-parser");
const passport = require("./Passport.js");
const cors = require('cors');
const app = express();
var flash = require("connect-flash");

app.use(cp("somesecret"));
app.use(
  session({
    secret: "somesecret"
  })
);
app.use(cors());
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((r, s, n) => {
  console.log("in a mid", r.user);
  n();
});

function checkLoggedIn(req, res, next) {
  console.log("check logged in");
  if (req.user) {
    next();
  } else {
    res.status(404).send("Unauthorised");
  }
}

app.use("/", express.static(path.join(__dirname, "Public")));
app.use(
  "/private",
  checkLoggedIn,
  express.static(path.join(__dirname, "Private"))
);

app.post(
  "/add",
  passport.authenticate("local-signup", {
    failureRedirect: "/red.html",
    successRedirect: "/private"
  })
);
app.post('/login',
    passport.authenticate("local-login"),
    function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.send(req.user);
    });

// app.post(
//   "/login",
//   passport.authenticate("local-login", {
//     failureRedirect: "/",
//     successRedirect: "/private"
//   })
// );

app.listen(1234, function() {
  console.log("Server started on http://localhost:1234");
});
