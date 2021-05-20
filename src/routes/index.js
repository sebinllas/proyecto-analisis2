const express = require("express");
const router = express.Router();

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
        console.log("user = ", user);
        console.log(typeof user);
        if (user[0] == undefined) {
          res.redirect("login");
        } else {
          res.send(`funcionó! jejejeje ${JSON.stringify(user[0])}`);
        }
      }
    );
  });
};
handleHome = (req, res) => {
  req.getConnection((err, conn) => {
    const query = conn.query("SELECT * FROM posts", (err, post) => {
      console.log("post = ", JSON.stringify(post));
      res.send("estos son los posts\n" + JSON.stringify(post));
    });
  });
};

//routing
router.get("/login", handleLogin);
router.get("/src/styles/login.css", handleLoginCss);
router.post("/auth", handleAuth);
router.get("/admin/usersdashboard", handleUsersDash);
router.get("/home", handleHome);

module.exports = router;
