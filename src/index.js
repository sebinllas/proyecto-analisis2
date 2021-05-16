const express = require("express"),
  path = require("path"),
  morgan = require("morgan"),
  mysql = require("mysql"),
  myConnection = require("express-myconnection");

const app = express();

// importing routes
//const customerRoutes = require('./routes/customer');

// settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

// middlewares
app.use(morgan("dev"));
app.use(
  myConnection(
    mysql,
    {
      host: "localhost",
      user: "root",
      password: "",
      port: 3306,
      database: "proyectoAnalisis2",
    },
    "single"
  )
);
app.use(express.urlencoded({ extended: false }));

// routes
//app.use('/', customerRoutes);

// static files
app.use(express.static(path.join(__dirname, "public")));

// starting the server
app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});

//control
handleLogin = (req, res) => {
  res.render("login.html");
};
handleLoginCss = (req, res) => {
  res.sendFile(path.join(__dirname, 'styles', 'login.css'));
};
handleAuth = (req, res) => {
  const data = req.body;
  console.log(data);
  res.send(`data: ${JSON.stringify(data)}`);
  
};

//routing
//const router = require('express').Router();
app.get("/login", handleLogin);
app.get("/src/styles/login.css", handleLoginCss);
app.post("/auth", handleAuth);
