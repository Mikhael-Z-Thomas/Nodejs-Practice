const express = require('express');
const router = express.Router();
const Posts = require("../models/post");

router.get('/',async (req,res)=>{
    

    try{
        const posts = await Posts.find();
        res.json(posts);
    }catch(err){
        res.json(err);
    }
})

router.post('/',async(req,res)=>{
    const post = new Posts({
        title:req.body.title,
        description:req.body.description
    });

    try{
        const savedPost = await post.save();
        res.json(savedPost);
    }catch(err){
        res.json({message:err});
    }

})

router.get('/:postID',async(req,res)=>{

    try{
        const post = await Posts.findById(req.params.postID);
        res.json(post);
    }catch(err){
        res.json({message:err});
    }
})

router.patch('/:postID',async(req,res)=>{
    try{
        const updatedPost = await Posts.updateOne(
                            {_id:req.params.postID},
                            {$set:{title:req.body.title}});
        res.json(updatedPost);                    
    }catch(err){
        res.json({message:err});
    }
});

router.delete('/:postID',async(req,res)=>{
    try{
        const removedPost = await Posts.remove({_id:req.params.postID});
        res.json(removedPost);
    }catch(err){
        res.json({message:err});
    }
})


module.exports = router;
