const db = require("../models/db");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + ".jpg";
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });
module.exports.printUploadForm = (req, res) => {
  res.render("upload.ejs");
};

(module.exports.uploadUserBlog = upload.single("image")),
  (req, res) => {
    let id = Math.floor(Math.random() * 10000);
    let userId = req.params.id;
    console.log(req.body);
    console.log(req.file);
    // db.execute("INSERT INTO table_blogs VALUES(?, ?, ?, ?, ?)", [
    //   id,
    //   title,
    //   content,
    //   null,
    //   userId,
    // ]).then((data) => {
    //   console.log(data);
    // });
  };
