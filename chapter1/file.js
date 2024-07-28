const fs = require("fs");

// Synchronous write file
// fs.writeFileSync("greet.txt", "Hello NodeJS");

// Asynchronous write file
// fs.writeFile("greet.txt", "Hello NodeJS Asynchronously", (err) => {
//     if (err) {
//         console.log(err);
//     }
// })

// Read file Synchronous
// const content = fs.readFileSync("./contact.txt", "utf-8");
// console.log(content);

// Read file Asynchronous
fs.readFile("./contact.txt", "utf-8", (err, content) => {
    if (err) {
        console.log("Error: " + err);
    }
    else {
        console.log(content);
        // Synchronous append file
        fs.appendFileSync("greet.txt", "\n" + content);

        // Asynchronous append file
        // content = "\n" + content
        // fs.appendFile("greet.txt", content, (err) => {
        //     if (err) {
        //         console.log(err);
        //     }
        //     else {
        //         fs.readFile("greet.txt", "utf-8", (err, content) => {
        //             if (err) {
        //                 console.log(err);
        //             }
        //             else {
        //                 console.log(content);
        //             }
        //         })
        //         console.log("File appended successfully");
        //     }
        // })
    }
})

// Copy file content
// fs.copyFileSync("./greet.txt", "./copy.txt");

// Rename file
// fs.renameSync("./copy.txt", "./renamed.txt");

// Delete file
fs.unlinkSync("./renamed.txt");