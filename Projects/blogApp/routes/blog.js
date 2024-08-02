const { Router } = require("express");
const Blog = require("../models/blog");
const uploadImage = require("../services/imageUploader");


const router = Router();

router.get("/add-new", (req, res) => {
    return res.render("addBlog", { user: req.user })
})

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findById(id).populate("createdBy");
    return res.render("blog", { blog, user: req.user })
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

module.exports = router