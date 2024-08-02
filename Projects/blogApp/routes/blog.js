const { Router } = require("express");
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const uploadImage = require("../services/imageUploader");


const router = Router();

router.get("/add-new", (req, res) => {
    return res.render("addBlog", { user: req.user })
})

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findById(id).populate("createdBy");
    const comments = await Comment.find({ blogId: id }).populate("createdBy");
    return res.render("blog", { blog, user: req.user, comments })
})

router.post("/add-new", uploadImage.single("coverImageURL"), async (req, res) => {
    const { title, body } = req.body;
    const coverImageURL = req.file ? `/images/uploads/blog/${req.file.filename}` : null;
    const createdBy = req.user._id;
    var blog = { title, body, coverImageURL, createdBy };
    if (coverImageURL === null) blog = { title, body, createdBy };
    try {
        await Blog.create(blog);
        return res.redirect("/");
    } catch (error) {
        console.log("Error----> " + error.message);
        return res.render("addBlog", { error: error.message });
    }
});

// Delete the Blog Post
router.get("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await Blog.findByIdAndDelete(id);
        return res.redirect("/");
    } catch (error) {
        console.log("Error----> " + error.message);
        res.error = error.message;
        return res.redirect(`/user/${id}`);
    }
});

router.post("/edit/:id", uploadImage.single("coverImageURL"), async (req, res) => {
    const { id } = req.params;
    const { title, body } = req.body;
    const coverImageURL = req.file ? `/images/uploads/blog/${req.file.filename}` : null;
    const createdBy = req.user._id;
    var blog = { title, body, coverImageURL, createdBy };
    if (coverImageURL === null) blog = { title, body, createdBy };
    try {
        await Blog.findByIdAndUpdate(id, blog);
        return res.redirect("/");
    } catch (error) {
        console.log("Error----> " + error.message);
        return res.render("editBlog", { error: error.message });
    }
});

// Creating Comments on the Blog Posts

router.post("/comment/:blogId/", async (req, res) => {
    if (!req.user) return res.render("signin", { error: "You are not Logged In. Please Login First!" });
    const comment = await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id,
    })

    return res.redirect(`/blog/${req.params.blogId}`);
});

module.exports = router