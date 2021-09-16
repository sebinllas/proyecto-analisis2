const express = require("express"),
  path = require("path"),
  morgan = require("morgan"),
  mysql = require("mysql"),
  myConnection = require("express-myconnection"),
  session = require("express-session");

const app = express();



// settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

// middlewares
app.use(morgan("dev"));
app.use(express.json())
app.use(
  myConnection(
    mysql,
    {
      host: "localhost",
      user: "root",
      password: "",
      port: 3306,
      database: "proyecto_analisis",
    },
    "single"
  )
);
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// importing routes
app.use(require("./routes"));

// static files
app.use(express.static(path.join(__dirname, "public")));

// starting the server
app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});
