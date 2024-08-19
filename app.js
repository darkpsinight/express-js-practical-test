const express = require("express");
const app = express();
const path = require("path");

app.use(express.static('public'))

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// write your middleware here
function workingHoursMiddleware(req, res, next) {
  const now = new Date();

  const day = now.getDay();

  const hour = now.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 19) {
    next();
  } else {
    res.status(402).send("Sorry, closed !");
  }
}

app.use(workingHoursMiddleware);

// home page route here => path : /

app.get("/", (req, res) => {
  res.render("home");
});

// services page route here => path : /services

app.get("/services", (req, res) => {
  res.render("services");
});

// contact page route here => path : /contact

app.get("/contact", (req, res) => {
  res.render("contact");
});

// listen to your application here

app.listen(3000, () => {
  console.log("Server is running on part 3000");
});
