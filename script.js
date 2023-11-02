import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var userPassword = "";
var checker = false;

app.use(bodyParser.urlencoded({ extended: true }));

function passwordCheck(req, res, next) {
  console.log(JSON.stringify(req.body));
  console.log("req.body:" + req.body);
  console.log("req.body.password:" + req.body.password);
  userPassword = req.body.password;
  if (userPassword == "November") {
    checker = true;
  }
  next();
}

app.use(passwordCheck);

app.get("/", (req, res) => {
  console.log(__dirname);
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
  if (checker) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
