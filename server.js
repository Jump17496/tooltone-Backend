const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

//import routes
const authRoute = require('./routes/auth')
const categoryRoute = require('./routes/category')
const userRoute = require('./routes/user')
const productRoute = require('./routes/product')
const cloudinaryRoute = require('./routes/cloudinary')
const adminRoute = require('./routes/admin')
const locationRoute = require('./routes/location')



const app = express()



//connect cloud database
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:false
})
.then(()=>console.log("เชื่อมต่อฐานข้อมูลเรียบร้อย"))
.catch((err)=>console.log(err))


//midleware
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

//use route
app.use('/api',authRoute)
app.use('/api',categoryRoute)
app.use('/api',userRoute)
app.use('/api',productRoute)
app.use('/api',cloudinaryRoute)
app.use('/api',adminRoute)
app.use('/api',locationRoute)



const port = process.env.PORT || 8080
app.listen(port,()=>console.log(`start server in port ${port}`))