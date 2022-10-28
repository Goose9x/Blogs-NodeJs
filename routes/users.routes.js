const express = require("express");
const router = express.Router();

// const db = require("../models/db");

const userController = require("../controllers/users.controller");
const { requireAdmin } = require("../middlewares/auth.middlewares");
const blogController = require("../controllers/blogs.controller");
const uploadController = require("../controllers/upload.controller");

// "/users"

// /user (Get all)
router.get("/", requireAdmin, userController.getAll);

// Get one by id
router.get("/:id", userController.getOneById);

// Create one by id
router.post("/", userController.createUser);

// Update one by id
router.put("/:id", userController.updateOneById);

// Delete one by id
router.delete("/:id", requireAdmin, userController.deleteOneById);
// Get blog
router.get("/:id/blogs", blogController.getOneBlogById);
// Upload blog
router.get("/:id/upload", uploadController.printUploadForm);
router.post("/:id/upload", uploadController.uploadUserBlog);
module.exports = router;
