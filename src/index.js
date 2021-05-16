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
  res.sendFile(path.join(__dirname, "styles", "login.css"));
};
handleUsersDash = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM users", (err, users) => {
      if (err) {
        res.json(err);
      }
      console.log(users);
      res.render("users", {
        data: users,
      });
    });
  });
};
handleAuth = (req, res) => {
  const data = req.body;
  //console.log(data);
  req.getConnection((err, conn) => {
    const query = conn.query(
      "SELECT * FROM users WHERE  userName = ? AND password = ?",
      [data.userName, data.password],
      (err, user) => {
        console.log('user = ', user);
        console.log(typeof user)
        if(user[0] == undefined){
          res.redirect('login')
        }else{
          res.send(`funcionó! jejejeje ${JSON.stringify(user[0])}`);
        }
        
      }
    );
  });
};

//routing
app.get("/login", handleLogin);
app.get("/src/styles/login.css", handleLoginCss);
app.post("/auth", handleAuth);
app.get("/admin/usersdashboard", handleUsersDash);
