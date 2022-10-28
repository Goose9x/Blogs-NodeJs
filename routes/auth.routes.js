const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");
const authController = require("../controllers/auth.controller");

// define routes
// "/register" ==> sử dụng users.controller createUser
router.get("/register", authController.regiserRender);
router.post("/register", userController.createUser);

// "/login" ==> sử dụng users.controller với tên là login
router.get("/login", authController.loginRender);

router.post("/login", authController.login);
//  thực hiện tìm kiếm trong db xem có user đó ko
//  nếu không -> trả về người dùng ko tồn tại
//  nếu có --> check pass
//         --> Nếu đúng trả về res.json({message: "login successfully"})
//         --> Nếu sai trả về res.json({message: "wrong password"})
router.get("/logout", authController.logout);

module.exports = router;
