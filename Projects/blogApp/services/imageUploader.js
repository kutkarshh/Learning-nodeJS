// Using Multer to upload files
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log();
        if (file.fieldname === "profileImage")
            return cb(null, "./public/images/uploads/user");
        else if (file.fieldname === "coverImageURL")
            return cb(null, "./public/images/uploads/blog");

        return cb(null, "./public/images/uploads");
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({ storage: storage })

module.exports = upload;