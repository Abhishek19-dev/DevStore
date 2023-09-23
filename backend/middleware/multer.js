const multer = require("multer")

const storage = multer.memoryStorage()



//for single Uploads:-
const singleUpload = multer({storage,limits:{fileSize:1024 * 1024}}).single("file")

 //for multiple Uploads:-
const multipleUpload = multer({storage}).array("files",2);
// const multipleUpload = multer({storage,limits: { fileSize: 1024 * 1024 }}).array("files",3);

 



module.exports = {
    singleUpload: singleUpload,
    multipleUpload: multipleUpload
};


