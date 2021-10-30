const express=require("express");
const mongoose=require("mongoose");
const userModel = require("./model/user");
var bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const router=express.Router();
const secret="secret"

router.use("/", function(req,res,next){
    console.log("middleware user")
    let token=req.headers.authorization?.split("bearer ")[1]
    if(!token){
        res.status(401).json({
            status:"failed",
            message:"Not Authenticated",
        })
        return;
    }
    jwt.verify(token, secret,async function(err, decoded) {
        if(err){
            res.status(401).json({
                status:"failed",
                message:"Not Authenticated",
            })
            return;
        }
        if(decoded){
            const user=await userModel.findOne({_id:decoded.data})
            if(user){
                req.user=user._id
                next()
            }
            else{
                res.status(401).json({
                    status:"failed",
                    message: "Invalid Token"
                })
            }
        }
        
      });   

})

router.get("/loginuser", async function(req,res){
    user= await userModel.findOne({_id:req.user})
    res.status(200).json({
        status:"success",
        user:user
    })
})
module.exports=router