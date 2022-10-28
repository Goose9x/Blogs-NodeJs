const express = require("express");
const router = express.Router();
const { requireAdmin } = require("../middlewares/auth.middlewares");
const blogController = require("../controllers/blogs.controller");
// /user (Get all)
router.get("/", requireAdmin, blogController.getAllBlogs);

// Get one by id
router.get("/:id", blogController.getOneBlogById);

// Create one by id
// router.post("/", blogController.createBlog);

// Update one by id
router.put("/:id", blogController.updateBlogById);

// Delete one by id
router.delete("/:id", blogController.deleteOneBlogById);

module.exports = router;
