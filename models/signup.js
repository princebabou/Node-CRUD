const mongoose =require("mongoose");
const config=require("config");
const signupSchema=new mongoose.Schema({
    username:{
        type:String
    },
    password:{
        type:String
    },
    email:{
        type:String
    },
    roleId:{
        type:Number,
        default:"1020"
    }
});
const signupModel=new mongoose.model("signup",signupSchema);

module.exports=signupModel;