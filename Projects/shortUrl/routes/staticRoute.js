const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const { handleDeleteUrlById } = require("../controllers/url");
const User = require("../models/user");

router.get("/", async (req, res) => {
    if (!req.user) return res.render("login");
    const myUrls = await URL.find({ createdBy: req.user._id });
    var allUrls = await URL.find({});
    allUrls = allUrls.filter((url) => !myUrls.some(myUrl => myUrl._id.toString() === url._id.toString()));
    return res.render("home", { all_urls: allUrls, my_urls: myUrls });
});
router.get("/signup", async (req, res) => {
    return res.render("signup");
});

router.get("/login", async (req, res) => {
    return res.render("login");
});

module.exports = router;
