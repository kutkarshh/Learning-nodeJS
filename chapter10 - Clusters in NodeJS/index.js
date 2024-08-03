const express = require('express');
const app = express();

app.get("/", (req, res, next) => {
    res.json({
        message: `Hello from ${process.pid}`
    })
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
