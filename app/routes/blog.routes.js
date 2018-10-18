const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog.controller");

router.post("/blog", blogController.createBlog);
router.get("/blog/:blogId", blogController.findBlogById);
router.get("/blog/authername/:authername", blogController.findBlogByAuthorName);
router.get("/blog/query", blogController.findBlogByQuery)
router.get("/blogs", blogController.findAllBlogs);
router.put("/blog/:blogId", blogController.updateBlog);
router.delete("/blog/:blogId", blogController.deleteById);

module.exports = router;