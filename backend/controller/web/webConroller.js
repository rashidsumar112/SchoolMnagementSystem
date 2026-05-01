const { enquiryModel } = require("../../model/Web.models");



//THIS CONTROLLER FOR INSERT  API
let EnquiryInsert=async(req,res)=>{
    try {
        let {name,email,fathername,phone,rollno,classname,grade}=req.body;
        let enquiry=new enquiryModel ({
             name:name,
             email:email,
             fathername:fathername,
             phone:phone,
             rollno:rollno,
             classname:classname,
             grade:grade
        })

        await enquiry.save()
        res.status(201).send({status:1,message:"Data saved successfully.......",enquiry})
    } catch (err) {
        if (err && err.code === 11000) {
            const duplicateField = Object.keys(err.keyPattern || {})[0] || 'field'
            return res.status(409).send({
                status:0,
                message:`Duplicate ${duplicateField}. Please use a unique value.`,
                error: err.message
            })
        }

        res.status(500).send({status:0,message:"Error while saving Enquiry...." ,error:err?.message || err})
    }

    
}
 //this IS CONTROLLER FOR VIEW API

 let EnquiryList=async(req,res)=>{
    try {
        let enquiry=await enquiryModel.find().sort({_id:-1})
        res.send({status:1,msg:"Data list for view",enquiryList:enquiry})
    } catch (err) {
        res.status(500).send({status:0,msg:"Error fetching enquiry list",error:err?.message || err})
    }
    }


    //this is Controller for Delete API
    let EnquiryDelete=async(req,res)=>{
        try {
            let enId=req.params.id;
            let enquiry= await enquiryModel.deleteOne({_id:enId})

            if (!enquiry.deletedCount) {
                return res.status(404).send({status:0,MSG:'Enquiry not found'})
            }

            res.send({status:1,MSG:'Enquiry Deleted Succfully',enquiry})
        } catch (err) {
            res.status(500).send({status:0,MSG:'Error deleting enquiry',error:err?.message || err})
        }
    }

let enquirySingleEdit=async(req,res)=>{
    try {
        let enId=req.params.id;
        let enquiry=await enquiryModel.findOne({_id:enId})

        if (!enquiry) {
            return res.status(404).send({status:0,message:'Enquiry not found'})
        }

        res.send({status:1,enquiry})
    } catch (err) {
        res.status(500).send({status:0,message:'Error fetching enquiry',error:err?.message || err})
    }
}

let enquiryUpdate=async(req,res)=>{
    try {
        let enId=req.params.id;
        let {name,email,phone,rollno,fathername,classname,grade}=req.body;
        let UpdateOBJ={
            name:name,
            email:email,
            phone:phone,
            rollno:rollno,
            fathername:fathername,
            classname:classname,
            grade:grade
            
        }
        let Updateenquiry=await enquiryModel.updateOne({_id:enId},UpdateOBJ)

        if (!Updateenquiry.matchedCount) {
            return res.status(404).send({status:0,msg:"Enquiry not found"})
        }

        res.send({status:1,msg:"data is updated successfuly",updateObje:Updateenquiry})
    } catch (err) {
        if (err && err.code === 11000) {
            const duplicateField = Object.keys(err.keyPattern || {})[0] || 'field'
            return res.status(409).send({
                status:0,
                msg:`Duplicate ${duplicateField}. Please use a unique value.`,
                error: err.message
            })
        }

        res.status(500).send({status:0,msg:"Error updating enquiry",error:err?.message || err})
    }
    

}


module.exports={EnquiryInsert,EnquiryList,EnquiryDelete,enquirySingleEdit,enquiryUpdate}