const db = require("../models/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
var strongRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);
module.exports.getAll = (req, res) => {
  // pagesize va current page index
  // querystring

  let { page_size, page_index } = req.query;
  console.log(page_size, page_index);
  // check neu bon nay khong ton tai thi tra ve ban ghi dau tien
  page_index = Number(page_index) || 1; // (page_index = page_index ? page_index : 1)
  page_size = Number(page_size) || 5;
  let total = 0;
  db.execute(`SELECT * FROM table_users `)
    // neu ton tai thi tra ve pagesize va pageindex
    .then((data) => {
      let [rows, cols] = data;
      //array detructuring
      // let rows = data[0]
      // let cols = data [1]
      total = rows.length;
      return db.execute(
        `SELECT * FROM table_users LIMIT ${page_size} OFFSET ${
          (page_index - 1) * page_size
        }`
      );
      // res.render("users.ejs", { data: rows });
    })
    .then((data) => {
      let [rows, cols] = data;
      console.log(total);
      res.render("users.ejs", {
        data: rows,
        total,
        page_size,
        page_index,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};



module.exports.getOneById = (req, res) => {
  let id = req.params.id;
  db.execute("SELECT * FROM table_users WHERE id = ?", [id])
    .then((data) => {
      let [rows] = data;
      res.status(200).json({
        data: rows[0],
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.createUser = (req, res) => {
  let { email, password } = req.body;
  // Input or not
  if (!email || !password) {
    return res.status(500).json({ message: "Invalid email or password" });
  }
  // Strong password
  if (!strongRegex.test(password)) {
    return res.status(500).json({ message: "Password is not strong enough" });
  }

  // generrate password and id
  password = bcrypt.hashSync(password, saltRounds);
  let id = Math.floor(Math.random() * 10000);
  db.execute("SELECT * FROM table_users WHERE email = ?", [email])
    .then((data) => {
      let [rows] = data;
      // 1 mảng chứa 1 phần tử nếu tìm thấy
      // Hoặc là mảng [] nếu k tìm thấy
      if (rows.length > 0) {
        // res.status(400).json({ message: "User already exist" });
        return Promise.reject("User already exist");
      } else {
        return db.execute(
          "INSERT INTO table_users VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
          [id, null, null, email, null, null, password, null]
        );
      }
    })
    .then((data) => {
      res.status(200).json({
        message: "Create one successfully",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.updateOneById = (req, res) => {
  let { id } = req.params;
  // let id = req.params.id
  let { name, username, phone, website } = req.body;
  db.execute(
    "UPDATE table_users SET name = ?, username = ?, phone = ?, website = ? WHERE id = ?",
    [name, username, phone, website, id]
  )
    .then((data) => {
      console.log(data);
      res.status(200).json({
        message: "Update one successfully",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.deleteOneById = (req, res) => {
  let { id } = req.params;
  db.execute("DELETE FROM table_users WHERE id = ? ", [id])
    .then((data) => {
      return db
        .execute("DELETE FROM table_blogs WHERE user_id = ? ", [id])
        .then((data) => {
          res.status(200).json({
            message: "Delete one successfully",
          });
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

// module.exports.deleteOneById = (req, res) => {
//   let { id } = req.params;
//   db.execute("DELETE FROM table_users WHERE id = ? ", [id])
//     .then((data) => {
//       res.status(200).json({
//         message: "Delete one successfully",
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
