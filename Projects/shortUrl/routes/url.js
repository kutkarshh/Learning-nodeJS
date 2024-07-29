const express = require("express");
const { handleGenerateNewShortUrl, handleGetRedirectURL, handleDeleteUrlById,
    handleGetAnalytics
} = require("../controllers/url");
const router = express.Router();

router.route("/:shortId").get(handleGetRedirectURL).delete(handleDeleteUrlById);
router.post("/", handleGenerateNewShortUrl);

router.get("/analytics/:shortId", handleGetAnalytics)

// DELETE URL by shortId
router.post("/del/:shortId", handleDeleteUrlById);

module.exports = router;