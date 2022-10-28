const db = require("../models/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const _ = require("lodash");

module.exports.getAllBlogs = (req, res) => {
  let { page_size, page_index } = req.query;
  page_index = Number(page_index) || 1; // (page_index = page_index ? page_index : 1)
  page_size = Number(page_size) || 4;
  let total = 0;
  db.execute("SELECT * FROM table_blogs ")
    .then((data) => {
      total = data[0].length;
      return db.execute(
        `SELECT * FROM table_blogs LIMIT ${page_size} OFFSET ${
          (page_index - 1) * page_size
        }`
      );
    })
    .then((data) =>
      res.render("blogs.ejs", {
        data: data[0],
        total,
        page_size,
        page_index,
      })
    )
    .catch((err) => {
      console.log(err);
    });
};

module.exports.getOneBlogById = (req, res) => {
  let id = req.params.id;
  console.log(id);
  db.execute("SELECT * FROM table_blogs WHERE user_id = ?", [id]).then(
    (data) => {
      let [rows] = data;
      let renderData = _.chunk(rows, 3); //[1,2,3],[4,5]
      res.render("userblog.ejs", {
        data: renderData,
        id,
      });
    }
  );
};

module.exports.createBlog = (req, res) => {
  let { title, content } = req.body;
  let { user_id } = req.params;
  if (!title || !content) {
    res.status(400).json({ message: "Thieu" });
  }
  let id = Math.floor(Math.random() * 1000);
  db.execute("INSERT INTO table_blogs VALUES(?, ?, ?, ?, ?)", [
    id,
    title,
    content,
    null,
    user_id,
  ])
    .then((data) => {
      res.status(200).json({ message: "Create Blog ok" });
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};

module.exports.updateBlogById = (req, res) => {
  let id = req.params.id;
  let { title, content, image, user_id } = req.body;
  console.log(title, content, image, user_id);
  db.execute("SELECT * FROM table_blogs WHERE id = ?", [id]).then((data) => {
    if (data[0] == 0) {
      res.status(400).json({ message: "Id not exist" });
    } else {
      db.execute("SELECT * FROM table_users WHERE id = ?", [user_id]).then(
        (data) => {
          if (data[0] == 0) {
            res.status(400).json({ message: "UserId not exist" });
          } else {
            db.execute(
              "UPDATE table_blogs SET title = ?, content = ?, image = ? WHERE id = ?",
              [title, content, image, id]
            ).then((data) => {
              res.status(200).json({ message: "Update oke" });
            });
          }
        }
      );
    }
  });
};

module.exports.deleteOneBlogById = (req, res) => {
  let id = req.params.id;
  db.execute("SELECT * FROM table_blogs WHERE id = ?", [id])
    .then((data) => {
      if (data[0] == 0) {
        res.status(400).json({ message: "Id not exist" });
      } else {
        return db
          .execute("DELETE FROM table_blogs WHERE id = ?", [id])
          .then((data) => {
            res.status(200).json({ message: "Delete Successfully" });
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
