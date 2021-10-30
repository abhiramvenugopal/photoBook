const express=require("express");
const mongoose=require("mongoose");
const userModel = require("./model/user");
const { body, validationResult } = require('express-validator');
var bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var postApi=require("./postapi")
var userApi=require("./userapi")
const cors=require("cors")

const secret="secret"


const app=express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())
mongoose.connect('mongodb://localhost/Instaclone');


app.use("/api/v1/posts", function(req,res,next){
    console.log("middleware")
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


app.use("/api/v1/posts",postApi);
app.use("/api/v1/users",userApi);


app.post("/api/v1/register",body("email").isEmail(),body("password"),async function(req,res){
    let {name,email,password}=req.body
    try {
        bcrypt.hash(password, 10,async function(err, hash) {
            if(err){
                res.status(500).json({status:"Encryption failed"})
            }
            await userModel.create({
                name:name,
                email:email,
                password:hash
            })
        });
    } catch (error) {
        res.status(500).json({status:"failed"})
        console.log("error",error)
        
    }
    
    res.status(200).json({
        status:"success",
        message:"register success"
    })
})


app.post("/api/v1/login",body("email").isEmail(),body("password"),async function(req,res){
    console.log("hello")
    let {name,email,password} = req.body
    try{
        var user=await userModel.findOne({email:email})
        console.log(user)
        if(!user){
            res.status(401).json({status:"failed",message:"user not found"})
        }
        bcrypt.compare(password, user.password, function(err, result) {
            console.log("inside compare")
            console.log(err,result)
            console.log(password,user.password)
            if(err){
                res.status(500).json({status:"failed"})
                console.log(err)
            }
            if(result){
                
                let token=jwt.sign({
                    data: user._id
                  }, secret, { expiresIn: 60 * 60 });
                console.log(token)
                res.status(200).json({
                    token:token
                })
            }
        });
    }
    catch(err){
        res.status(401).json({
            "status":"failed",
            "message":"login failed"
        })
    }
})


app.listen(3000,()=>{
    console.log("server started")
})
