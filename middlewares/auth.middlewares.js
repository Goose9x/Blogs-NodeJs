const db = require("../models/db");

module.exports.requireAuth = (req, res, next) => {
  if (Object.keys(req.signedCookies).length === 0) {
    res.redirect("/auth/login");
  } else {
    next();
  }
};

module.exports.notRequireAuth = (req, res, next) => {
  if (Object.keys(req.signedCookies).length !== 0) {
    res.redirect("/");
  } else {
    next();
  }
};

module.exports.requireAdmin = (req, res, next) => {
  let userId = req.signedCookies.userId;
  console.log(userId);
  db.execute("SELECT role FROM table_users WHERE id = ?", [userId]).then(
    (data) => {
      let role = data[0][0].role;
      if (role == "admin") {
        next();
      } else if (role == "user") {
        res.redirect(`/users/${userId}/blogs`);
      }
    }
  );
};
