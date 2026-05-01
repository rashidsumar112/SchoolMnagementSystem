let mongoose=require("mongoose")
let Schema=mongoose.Schema;
let EnquirySchema= new Schema({
    name:{
        type:String,
        require:true

    },
    email:{
        type:String,
        require:true,
        unique:true

    },
    fathername:{
        type:String,
        require:true

    },
    phone:{
        type:String,
        require:true

    },
    rollno:{
        type:String,
        require:true,
        unique:true

    },
    classname:{
        type:String,
        require:true

    },
    grade:{
        type:String,
        require:true

    }
})

let enquiryModel=mongoose.model("schooolenquiry",EnquirySchema)
module.exports={enquiryModel}