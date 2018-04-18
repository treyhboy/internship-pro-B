require("dotenv").config();
const express = require('express');
const http = require('http');
const bp = require('body-parser');
const app = express();
const server = http.Server(app);
const session = require("express-session");
const cp = require("cookie-parser");
const passport = require("./Config/Passport/Passport.js");
const cors = require("cors");
const routes = require("./Src/Routes/Login");
const flash = require("connect-flash");

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

app.use("/", routes);


server.listen(process.env.PORT||1234, function () {
  console.log("Server started on http://localhost:1234");
});
