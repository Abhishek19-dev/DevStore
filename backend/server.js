const app = require("./app");
const cloudinary = require('cloudinary').v2
// const multer = require('multer');


//uncaught error caught 
//console.log(youtube) //youtube not defined aise error ke lite
process.on("uncaughtException",(err)=>{
        console.log(`Error:${err.message}`)
        console.log("Server closing down")
            process.exit(1)
    });

// const dotenv = require('dotenv')

//config:-
// dotenv.config({path:"backend/config/config.env"})

// require('dotenv').config()

//database connection
const mongoose = require("mongoose");
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb+srv://AbhishekPadiyar:ripperpubg1234@cluster0.dimd4wk.mongodb.net/ECommerceAp",{
    useNewUrlParser: true,
  });
  console.log("database connected");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const CLOUDINARY_NAME = "dvjfrujbp"
const CLOUDINARY_API_KEY = "329414564435998"
const CLOUDINARY_API_SECRET = "x6RJZKQdi5t1PuRS8nC-bTDhEMo"

cloudinary.config({
  cloud_name : CLOUDINARY_NAME,
  api_key : CLOUDINARY_API_KEY,
  api_secret : CLOUDINARY_API_SECRET
})

const PORT = 9050;
const server = app.listen(PORT, () => {
  console.log(`Server is working on http://localhost:${PORT}`);
})


// //unhandles promise rejection agr kuch server ke andr glt
process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`)
    console.log("Server closing down")
    server.close(()=>{
        process.exit(1);
    });
});