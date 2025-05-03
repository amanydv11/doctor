import mongoose from "mongoose";

const doctorSchema=new mongoose.Schema({
    name: {
        type:String,
        require:true
    },
    city: {
        type:String,
        require:true,
        trim:true
    },
    experience:{
        type:Number,
        require:true
    },
    image: {
        type:String,
        default:"https://sp.yimg.com/ib/th?id=OIP.xU50KMuwjr4AG2bP8u_XrgAAAA&pid=Api&w=148&h=148&c=7&dpr=2&rs=1"
    },
    specialization:{
        type:String,
        require:true,
        trim:true
    },
    course:{
        type:String,
        require:true,
        trim:true
    },
    consultFee:{
        type:String,
        require:true
    },
    language:{
        type:[String],
        require:true,
        trim:true
    },
    about:{
        type:String,
        require:true,
        trim:true
    },modeofConsultation:{
        type:String,
        require:true,
        trim:true
    },
    address:{
        type:String,
        require:true,
        trim:true
    },
},{
    timestamps: true
  })

const Doctor=mongoose.models.Doctor || mongoose.model('Doctor',doctorSchema);
export default Doctor;