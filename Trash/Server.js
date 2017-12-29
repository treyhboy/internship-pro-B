
//Ignore Trash Folder it is Just random code Snippets
//Kept here for future use or reference

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
