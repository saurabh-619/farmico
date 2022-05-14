const { Router } = require("express");
const {
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  commentABlog,
  likeABlog,
  createABlog,
  searchBlogs,
  getLoggedInUsersBlogs,
  deleteAComment,
} = require("../controllers/blog.controllers");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = Router();

router.route("/").get(getBlogs).post(authMiddleware, createABlog);
router.route("/user").get(authMiddleware, getLoggedInUsersBlogs);
router.route("/search").get(searchBlogs);
router.route("/slug/:id").get(getBlog);
router
  .route("/:id")
  .put(authMiddleware, updateBlog)
  .delete(authMiddleware, deleteBlog);
router.route("/vote/:id").put(authMiddleware, likeABlog);
router.route("/comment/:id").put(authMiddleware, commentABlog);
router
  .route("/comment/:blogId/:commentId")
  .delete(authMiddleware, deleteAComment);

module.exports = router;
