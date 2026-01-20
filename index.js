const express=require("express");
const app=express();
const {v4:uuidv4}=require("uuid");
const port=8080;
const path=require("path");
const methodOverride = require('method-override');

 

app.use(methodOverride('_method'));

app.set("views", path.join(__dirname,"views"))
app.set(express.static(path.join(__dirname,"views")));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
  console.log(uuidv4());

let posts=[
    {  
        id:uuidv4(),
      username:"atharv bhosale",
      content:"cricket is love"


    },
     { 
         id:uuidv4(),
        username:"rohit sharma",
        content:"six hitting machine."


    },
     { 
         id:uuidv4(),
        username:"virat kholi",
        content:" century paglu."

    }



];


app.listen(port,()=>{


    console.log("server is running");
  

});


app.get("/posts",(req,res)=>{

    res.render("main.ejs",{posts});


});


app.post("/posts",(req,res)=>{
    let id=uuidv4();
    let {username, content}=req.body;
    posts.push({id,username, content});
    
    res.redirect("/posts");

});


app.get("/posts/new",(req,res)=>{

    res.render("new.ejs",{posts});


});


app.get("/posts/:id",(req,res)=>{

let {id}=req.params;
let post=posts.find((posts)=>id==posts.id);
console.log(post);
console.log(id);
res.render("postid.ejs",{post});
    


});

app.patch("/posts/:id",(req, res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((posts)=>id==posts.id);
    post.content=newContent
    console.log(post.content);
    
     res.redirect("/posts");
    


});
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    post=posts.find((posts)=>id==posts.id);

    res.render("editPost.ejs",{post});




});
app.delete("/posts/:id",(req ,res)=>{
    let {id}=req.params;
     post=posts.find((posts)=>id==posts.id);
    posts=posts.filter((posts)=>id!=posts.id);

    res.redirect("/posts");


});



