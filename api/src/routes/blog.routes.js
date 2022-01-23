const { Router } = require("express");
const {
  getBlogs,
  getBlog,
  deleteBlog,
  commentABlog,
  voteABlog,
} = require("../controllers/blog.controllers");

const router = Router();

router.route("/").get(getBlogs);
router.route("/:id").get(getBlog).delete(deleteBlog);
router.route("/vote/:id").post(voteABlog);
router.route("/comment/:id").post(commentABlog);

module.exports = router;
