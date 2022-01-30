const { Router } = require("express");
const {
    getBlogs,
    getBlog,
    deleteBlog,
    commentABlog,
    likeABlog,
    createABlog,
} = require("../controllers/blog.controllers");

const router = Router();

router.route("/").get(getBlogs).post(createABlog);
router.route("/:id").get(getBlog).delete(deleteBlog);
router.route("/vote/:id").post(likeABlog);
router.route("/comment/:id").post(commentABlog);

module.exports = router;
