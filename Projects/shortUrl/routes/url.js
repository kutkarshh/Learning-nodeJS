const express = require("express");
const { handleGenerateNewShortUrl, handleGetRedirectURL, handleDeleteUrlById,
    handleGetAnalytics
} = require("../controllers/url");
const { restrictTo } = require("../middlewares/auth");
const router = express.Router();

router.route("/:shortId").get(handleGetRedirectURL).delete(handleDeleteUrlById);
router.post("/", handleGenerateNewShortUrl);

router.get("/analytics/:shortId", handleGetAnalytics)

// DELETE URL by shortId
router.post("/del/:shortId", restrictTo(["ADMIN", "NORMAL"]), handleDeleteUrlById);

module.exports = router;