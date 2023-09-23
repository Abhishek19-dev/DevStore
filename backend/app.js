const express = require('express');
const cors = require('cors');
const app = express() //server bananya
const errorMiddleware = require("./middleware/error")
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser')


// Middleware to parse JSON data from the request body
app.use(express.json())

app.use(cors());

//middleware should be used above routes inports
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
// app.use(fileUpload())


//Routes Imports
const product = require('./routes/productRoute')
const user = require('./routes/userRoute')
const order = require("./routes/orderRoute")
const project = require("./routes/projectRoute")



app.use("/api/v1",product.router)
app.use("/api/v1/",user.router)
app.use("/api/v1/",order.router)
app.use("/api/v1/",project.router)




//middlware for errors
app.use(errorMiddleware)





module.exports = app;
