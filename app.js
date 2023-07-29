const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');
const app = express();
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'))
mongoose.connect("mongodb+srv://shalinichabarwal:shalini03@cluster0.wdslcsh.mongodb.net/BlogWebDB?retryWrites=true");
const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    trunc:String
})
const Post = mongoose.model('post',postSchema);

app.get("/",function(req,res){
    Post.find()
    .then(function (result) {
        res.render('home',{posts:result})
    })
    .catch(function(err){
        res.send(err)
    })

})
app.get("/compose",function(req,res){
res.render('compose',{})
})
app.get("/about",function(req,res){
res.render('about')
})
app.get("/contact",function(req,res){
res.render('contact')
})
app.post("/compose",function(req,res){
const post = new Post({
    title:req.body.title,
    body:req.body.body,
    trunc:_.truncate(req.body.body, {
        length: 100,
      })
})
post.save();
res.redirect("/")
})
// app.get("/post/:param",function(req,res){
//     Post.findOne({_id:req.params.param})
//     .then(function(result){
//         res.render("post.ejs",{posts:result})
//     })
// })
app.post("/delete",function(req,res){
    Post.findByIdAndDelete({"_id": req.body.del})
    .then(function(){
        res.redirect("/")
    })
    .catch(function(err){
        res.send(err)
    })
})
app.listen(3000,function(){
    console.log("Server is running on port 3000")
})