const express = require('express');
const fs = require('fs');
const zlib = require('zlib');
const app = express();

app.get("/", (req, res, next) => {
    // reading a very large file using streams
    // const stream = fs.createReadStream("./data.txt", "utf-8");
    // stream.on("data", (chunk) => res.write(chunk));
    // stream.on("end", () => res.end());

    /* OR */

    // Using Readable Stream and zipping it using zlib which is the best standard library
    const readStream = fs.createReadStream("./data.txt", "utf-8");
    const gzip = zlib.createGzip();

    // Pipe the read stream to gzip and then to response
    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Content-Type', 'text/plain');

    readStream.pipe(gzip).pipe(res);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
