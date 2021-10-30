const express=require("express");
const mongoose=require("mongoose");
const postModel = require("./model/post");
const userModel = require("./model/user");
const router=express.Router();

router.use("/:id/update", async function(req,res,next){
    var post= await postModel.findOne({_id:req.params.id})
    if(post){
        if(post.user.toString()==req.user.toString()){
            next()
        }
        else{
            res.status(403).json({
                status:"Failed",
                message:"Access Denied"
            })
        }
    }
    else{
        res.status(401).json({
            status:"Failed",
            message:"Post Not Found"
        })
    }

})

router.get("/", async function(req,res){
    console.log("hello")
    posts= await postModel.find()
    res.status(200).json({
        status:"success",
        posts:posts
    })
})
router.get("/myposts", async function(req,res){
    posts= await postModel.find({user:req.user})
    res.status(200).json({
        status:"success",
        posts:posts
    })
})

router.post("/create", async function(req,res){
    try{
        const user=await userModel.findOne({_id:req.user})
        let data={
            likes:0,
            datetime:new Date(),
            name:user.name
        }
        console.log({...req.body,...data,user:req.user})
        posts= await postModel.create({...req.body,...data,user:req.user})
        res.status(200).json({
            status:"success",
            posts:posts
        })
    }
    catch(err){
        res.status(500).json({
            status:"failed",
            message:err
        })
    }
    
})

router.delete("/:id/update", async function(req,res){
    console.log("here come=====================================================")
    try{
        respose=await postModel.deleteOne({_id:req.params.id})
        res.status(200).json({
        status:"success",
        respose:respose
        })
    }
    catch(err){
        res.status(401).json({
            status:"failed",
            message:err
        })
    }
    
})
router.post("/:id/update", async function(req,res){
    try{
        response= await postModel.updateOne({_id:req.params.id},req.body)
        res.status(200).json({
        status:"success",
        response:response
        })
    }
    catch(err){
        res.status(401).json({
            status:"failed",
            message:"update failed"
        })
    }
})

module.exports=router