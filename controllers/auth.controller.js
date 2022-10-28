const db = require("../models/db");
const bcrypt = require("bcrypt");

module.exports.loginRender = (req, res) => {
  res.render("login.ejs");
};
module.exports.regiserRender = (req, res) => {
  res.render("register.ejs");
};
module.exports.login = (req, res) => {
  let email = req.body.email;
  let inputPassword = req.body.password;
  if (email && inputPassword) {
    db.execute("SELECT * FROM table_users WHERE email = ?", [email])
      .then((data) => {
        let [rows, cols] = data;
        if (rows.length == 0) {
          res.status(400).json({ message: "User not found" });
        } else {
          let passValid = bcrypt.compareSync(inputPassword, rows[0].password);
          if (!passValid) {
            res.status(400).json({ message: "Wrong password" });
          } else {
            res.cookie("userId", rows[0].id, { signed: true });
            res.status(200).json({
              message: `Chào mừng ${email} đã đến với bình minh vô tận`,
              status: "success",
            });
            // res.redirect("/"); ko hoạt động after res.cookie
            // --> để frontent làm
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (!email) {
    res.status(400).json({ message: "Please input username" });
  } else if (!inputPassword) {
    res.status(400).json({ message: "Please input password" });
  }
};
module.exports.logout = (req, res) => {
  // clear cookies
  // res.clearCookie()
  res.clearCookie("userId", {
    domain: "http://127.0.0.1:3800",
    path: "/auth/logout",
  });
  // Logout successfully
  // front-end got message
};

// authentication (xác thực)
// Session (phiên đăng nhập)
// Cookie
// Token (JWT-Json web token- bearer,.... )

// Authentication with Sestion (cookie, JWT,...) (Express JS)
