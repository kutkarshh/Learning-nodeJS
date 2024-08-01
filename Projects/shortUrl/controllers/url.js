const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" });
    const shortID = shortid.generate();
    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });
    return res.render("home", { id: shortID });
}

async function handleGetRedirectURL(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } }
    );
    if (!entry) return res.status(404).json({ error: "url not found" });
    return res.redirect(entry.redirectUrl);
}

async function handleDeleteUrlById(req, res) {
    try {
        const shortId = req.params.shortId;
        const url = await URL.findOneAndDelete({ shortId });
        if (!url) {
            const allUrls = await URL.find({});
            // Redirect to home with an error message as a query parameter
            return res.redirect('/?error=Url Not Found');
        }
        // Redirect to home with the deleted shortId as a query parameter
        return res.redirect(`/?deleted=${shortId}`);
    } catch (error) {
        // Redirect to home with an error message as a query parameter
        return res.redirect('/?error=Error Deleting Url');
    }
}

async function handleGetAnalytics(req, res) {
    try {
        const shortId = req.params.shortId;
        const result = await URL.findOne({ shortId });
        if (!result) {
            return res.status(404).json({ status: "Url Not Found" });
        }
        return res.json({
            result: "Total Visits",
            totalClicks: result.visitHistory.length,
            analytics: result.visitHistory
        });
    } catch (error) {
        return res.status(500).json({ status: "Error Getting Analytics", error: error.message });
    }
}

module.exports = { handleGenerateNewShortUrl, handleGetRedirectURL, handleDeleteUrlById, handleGetAnalytics };
