const express = require('express')
const router = express.Router()

const Post = require('../models/Post')

// 1. POST (create Data)

router.post('/', async(req,res)=>{
    //console.log(req.body)

    const postData = new Post({
        user:req.body.user,
        title:req.body.title,
        text:req.body.text,
        hashtag:req.body.hashtag,
        location:req.body.location,
        url:req.body.url
    })

    // try to insert

    try{
        const postToSave = await postData.save()
        res.send(postToSave)

    }catch(err){
        res.send({message:err})
    }
})

// 2. GET 1 (Read)

router.get('/', async(req,res) =>{
    try{
        const getPosts = await Post.find()
        res.send(getPosts)
    }catch(err){
        res.send({message:err})
    }
})


// 2. GET 2 (Read)

router.get('/:postId', async(req,res) =>{
    try{
        const getPostById = await Post.findById(req.params.postId)
        res.send(getPostById)
    }catch(err){
        res.send({message:err})
    }
})

// 3. PATCH

router.patch('/:postId', async(req,res)=>{
    try{
        const updatePostById = await Post.updateOne(
            {_id:req.params.postId},
            {$set:{
                user:req.body.user,
                title:req.body.title,
                text:req.body.text,
                hashtag:req.body.hashtag,
                location:req.body.location,
                url:req.body.url
                }
            })
        res.send(updatePostById)
    }catch(err){
        res.send({message:err})
    }
})

// 4. DELETE

router.delete('/:postId', async(req,res)=>{
    try{
        const deletPostById = await Post.deleteOne({id:req.params.postId})
        res.send(deletPostById)
    }catch(err){
        res.send({message:err})
    }  
})

module.exports = router