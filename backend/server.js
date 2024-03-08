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



//socket.io Connection
//Socket io setUp fully:-
const io = require('socket.io')(server , {
  pingTimeout : 60000,  //amount of time it will wait before off in ms
  cors :{ //it stands for cross origin errror
       origin : "http://localhost:3000",
       methods: ["GET", "POST"],
  }
})


io.on("connection",(socket)=>{
  console.log("connected to socket.io")
  socket.on('setup',(userData)=>{  //socket.io setup kiya aur uske baad frontend se koi data aaega servaer mei aur ek naya room mei join ho jaaega
       socket.join(userData._id)
       socket.emit("connected")
  })

  //main business:- join a chat
  socket.on("join chat",(room)=>{
    socket.join(room)
    console.log("user Joined Room ",room)
  })

  socket.on("typing",(room)=> socket.in(room).emit("typing"))
  socket.on("stop typing",(room)=> socket.in(room).emit("stop typing"))
  
  socket.on("new message",(newMessageReceived)=>{
    // console.log("newMessageReceived",newMessageReceived.message.chat)
    // var chat = newMessageReceived.chat
    var chat = newMessageReceived.message.chat
      // console.log("chat lkdsglkjadsg",chat)
    if(chat.users.length == 0)
    return console.log("Chat.users not defined")

    chat.users.forEach((user)=>{
      if(user._id == newMessageReceived.message.sender._id) return;
      // console.log("new message inside chat",newMessageReceived)
      console.log("user_id",user._id)
      socket.in(user._id).emit("message received",newMessageReceived)
    })
  })


  socket.off("setup",()=>{
    console.log("User Disconnected")
    socket.leave(userData._id)
  })
})

// //unhandles promise rejection agr kuch server ke andr glt
process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`)
    console.log("Server closing down")
    server.close(()=>{
        process.exit(1);
    });
});