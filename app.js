const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const cors = require("cors");
const morgan = require("morgan");
const {
  requireAuth,
  notRequireAuth,
} = require("./middlewares/auth.middlewares");
const cookieParser = require("cookie-parser");
//import route
let userRoutes = require("./routes/users.routes");
let authRoutes = require("./routes/auth.routes");
let blogRoutes = require("./routes/blogs.routes");

// Set up view engine
app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);

// use third-party middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(cookieParser("i love feifei"));

// set up route
app.get("/", requireAuth, (req, res) => {
  res.redirect("/users");
});

// Users route
app.use("/blogs", requireAuth, blogRoutes);
app.use("/users", requireAuth, userRoutes);
// Auth route
app.use("/auth", authRoutes);
// Blogs route
app.use("/blogs", requireAuth, blogRoutes);
// listen on port
app.listen(3800, () => {
  console.log("server is running on port http://127.0.0.1:3800");
});

// SQL- Structured query language - Ngôn ngữ dùng để truy vấn dữ liệu từ DB
// (query : truy vấn)
// bài trước học sheet,json(không hỗ trợ nhiều phương thức query, khó scale lên lớn )
//  ==> cần 1 nơi lưu trữ dữ liệu tối ưu hơn, dễ scalable hơn, dễ query hơn
//  ==> dùng MySQL
// SQL là ngôn ngữ dùng để truy vấn vào MySQL

// MySQL là gì ?
// Là một RDBMS
// ==> Relational Database Management System
// (hệ quản trị cơ sở dữ liệu(CSDL) quan hệ)
// Dữ liệu sẽ được lưu trữ trong CSDL dưới dạng bảng (table-entity-thực thể)

// Mỗi bảng sẽ có nhiều bản ghi (record) được lưu vào mỗi dòng (raw)

// Mỗi dòng (row) sẽ có nhiều cột thuộc tính (column)

// Trong dự án thực tế, chúng ta sẽ phải thiết kế 1 bản vẽ CSDL quan hệ
// Bản vẽ CSDL quan hệ có thể có 1 bản duy nhất, hoặc rất nhiều bản liên kết vs nhau
// bằng các mỗi quan hệ (1-1, 1-nhiều,nhiều-nhiều) (giải thích sau)
// (bản vẽ là ERD-entity relationshiip diagram)

// Hnay học SQL
// - Tạo schema (tạo database)
// - Tạo bảng (table)

// - Kêt nối MySQL đến project Express
// - Một số cú pháp C/R/U/D để thao tác với bảng
