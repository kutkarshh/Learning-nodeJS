const { Router } = require("express");
const Blog = require("../models/blog");
const uploadImage = require("../services/imageUploader");


const router = Router();

router.get("/add-new", (req, res) => {
    return res.render("addBlog", { user: req.user })
})

router.post("/add-new", uploadImage.single("coverImageURL"), async (req, res) => {
    const { title, body } = req.body;
    const coverImageURL = req.file ? `/uploads/blog/${req.file.filename}` : null;
    const createdBy = req.user._id;
    try {
        // await Blog.create({ title, body, createdBy, coverImageURL });
        // return res.redirect("/");
        console.log(title, body, coverImageURL, createdBy);
    } catch (error) {
        console.log("Error----> " + error.message);
        return res.render("addBlog", { error: error.message });
    }
});

module.exports = router