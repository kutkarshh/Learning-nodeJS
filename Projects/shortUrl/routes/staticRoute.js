const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const { restrictTo } = require("../middlewares/auth");

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
    var allUrls = await URL.find({});
    allUrls = allUrls.filter((url) => !myUrls.some(myUrl => myUrl._id.toString() === url._id.toString()));
    return res.render("home", { all_urls: allUrls, name: req.user.name, role: "ADMIN" });
})

router.get("/", restrictTo(["NORMAL"]), async (req, res) => {
    // if (!req.user) return res.render("login");
    const myUrls = await URL.find({ createdBy: req.user._id });
    var allUrls = await URL.find({});
    allUrls = allUrls.filter((url) => !myUrls.some(myUrl => myUrl._id.toString() === url._id.toString()));
    return res.render("home", { all_urls: allUrls, my_urls: myUrls, name: req.user.name });
});
router.get("/signup", async (req, res) => {
    return res.render("signup");
});

router.get("/login", async (req, res) => {
    return res.render("login");
});

router.get("/logout", async (req, res) => {
    return res.clearCookie("token").redirect("/login");
});

module.exports = router;
