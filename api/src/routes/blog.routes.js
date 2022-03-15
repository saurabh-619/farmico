const { Router } = require("express");
const {
  getBlogs,
  getBlog,
  deleteBlog,
  commentABlog,
  likeABlog,
  createABlog,
  searchBlogs,
} = require("../controllers/blog.controllers");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = Router();

router.route("/").get(getBlogs).post(authMiddleware, createABlog);
router.route("/search").get(searchBlogs);
router.route("/slug").get(getBlog);
router.route("/:id").delete(authMiddleware, deleteBlog);
router.route("/vote/:id").put(authMiddleware, likeABlog);
router.route("/comment/:id").put(authMiddleware, commentABlog);

module.exports = router;
