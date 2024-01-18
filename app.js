const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect(
  "mongodb+srv://shalinichabarwal:shalini03@cluster0.wdslcsh.mongodb.net/BlogWebDB?retryWrites=true"
);
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
      },
  category: {
    type: String,
    required: true,
  },
  trunc: String,
});
const Post = mongoose.model("post", postSchema);
const Post2 = mongoose.model("post2",postSchema)

app.get("/", function (req, res) {
  res.render("home");
});
app.get("/compose", function (req, res) {
  res.render("compose", {});
});
app.get("/contact", function (req, res) {
  res.render("contact");
});
app.get("/thought", function (req, res) {
  Post.find()
    .then(function (result) {
      res.render("thought", { posts: result });
    })
    .catch(function (err) {
      res.send(err);
    });
});
app.get("/quotes", function (req, res) {
  Post2.find()
    .then(function (result) {
      res.render("quotes", { posts: result });
    })
    .catch(function (err) {
      res.send(err);
    });
});
app.post("/compose", function (req, res) {
    if(req.body.category=="Thoughts"){
        const post = new Post({
            title: req.body.title,
            body: req.body.body,
            category: req.body.category,
            trunc: _.truncate(req.body.body, {
              length: 100,
            }),
          });
          post.save();
          res.redirect("/thought");
    } else{
        const post = new Post2({
            title: req.body.title,
            body: req.body.body,
            category: req.body.category,
            trunc: _.truncate(req.body.body, {
              length: 100,
            }),
          });
          post.save();
          res.redirect("/quotes")
    }
  
});
// app.get("/post/:param",function(req,res){
//     Post.findOne({_id:req.params.param})
//     .then(function(result){
//         res.render("post.ejs",{posts:result})
//     })
// })
app.post("/delete", function (req, res) {
  Post.findByIdAndDelete({ _id: req.body.del })
    .then(function () {
      res.redirect("/");
    })
    .catch(function (err) {
      res.send(err);
    });
});
app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
