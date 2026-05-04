let express=require("express")
let mongoose=require("mongoose")
require('dotenv').config()
let cors=require('cors')
const { enquiryRouter } = require("./Route/web/webRoutes")







let app=express()
app.use(express.json())
app.use(cors())








app.use('/api/website/enquiry',enquiryRouter)



mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("connected succussfully")
    //http://localhost:1020/api/website/enquiry/
    app.listen(process.env.PORT || 5000,()=>{
        console.log("server is runing on port",process.env.PORT)
    })
}).catch((err)=>{
    console.log("error in connection",err)
})
