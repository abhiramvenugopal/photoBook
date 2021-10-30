const mongoose=require("mongoose")
const Schema=mongoose.Schema

const userSchema= new Schema({
    name : String, 
    email : {type:String, required:true},
    password :{type :String, required:true},
    followers:{type:Number,required:true},
    following:{type:Number,required:true}
})

const userModel=mongoose.model("users",userSchema)

module.exports=userModel