let express=require("express")
const { EnquiryInsert,EnquiryList, EnquiryDelete,enquirySingleEdit,enquiryUpdate } = require("../../controller/web/webConroller")

let enquiryRouter=express.Router()


//calling  insert controller here//http://localhost:1020/api/website/enquiry/insert
enquiryRouter.post("/insert",EnquiryInsert)

//calling view controller Here   //http://localhost:1020/api/website/enquiry/view
enquiryRouter.get("/view",EnquiryList)


//calling the delete controller Here //http://localhost:1020/api/website/enquiry/delete
enquiryRouter.delete('/delete/:id',EnquiryDelete)


//calling the Edit controller Here //http://localhost:1020/api/website/enquiry/single
enquiryRouter.get('/single/:id',enquirySingleEdit)


//calling the Update controller Here //http://localhost:1020/api/website/enquiry/update
enquiryRouter.put('/update/:id',enquiryUpdate)




module.exports= {enquiryRouter}