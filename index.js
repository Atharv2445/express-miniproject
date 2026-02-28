const express=require("express");
const app=express();
const {v4:uuidv4}=require("uuid");
const port=8080;
const path=require("path");
const methodOverride = require('method-override');
const mysql=require("mysql2");
//const { faker } = require('@faker-js/faker');





app.use(methodOverride('_method'));

app.set("views", path.join(__dirname,"views"))
app.set(express.static(path.join(__dirname,"views")));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
  console.log(uuidv4());


  const connection=mysql.createConnection(

    {
        host:"localhost",

     user:"root",
     database:"posts",
     password:"Atharv2445@"


    }
  );

/*let posts=[
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
*/

app.listen(port,()=>{


    console.log("server is running");
  

});


app.get("/posts",(req,res)=>{

    try{

        let q="select * from user";

    connection.query(q,(err, result)=>{
        if (err) throw err;
        console.log(result);
        let user=result;
         res.render("main.ejs",{user});
    } 
 );}catch(err){
        console.log(err);
    }
}); 


app.post("/posts",(req,res)=>{
     try{
        let {id: newid}=req.body;
        let { content : newcontent, username:newusername}=req.body;
        console.log(newid);

       const q = 'INSERT INTO user VALUES (?, ?, ?)';
      const val = [newid, `${newusername}`, `${newcontent}`];
    connection.query(q,val,(err, result)=>{
        if (err) throw err;
        console.log(result);
        let user=result[0];
        res.redirect("/posts");
       
    } 
 );}catch(err){ 
        console.log(err);
    }
      


    
   // let id=uuidv4();
    //let {username, content}=req.body;
   // posts.push({id,username, content});
    
   // res.redirect("/posts");

});


app.get("/posts/new",(req,res)=>{
      try{
        let {id} =req.params;

        let q=`select * from user `;

    connection.query(q,(err, result)=>{
        if (err) throw err;
        console.log(result);
        let user=result[0];
        res.render("new.ejs",{user});
    } 
 );}catch(err){ 
        console.log(err);
    }
     
    
   // res.render("new.ejs",{posts});


});


app.get("/posts/:id",(req,res)=>{
    
      try{
        let {id} =req.params;

        let q=`select * from user where id=${id}`;

    connection.query(q,(err, result)=>{
        if (err) throw err;
        console.log(result);
        let user=result[0];
        res.render("postid.ejs",{user});
    } 
 );}catch(err){ 
        console.log(err);
    }

//let {id}=req.params;
//let post=posts.find((posts)=>id==posts.id);
//console.log(post);
//console.log(id);
//res.render("postid.ejs",{post});
    


});

app.patch("/posts/:id",(req, res)=>{
        try{
        let { id } =req.params;
        let {username}=req.body;
        let {content}=req.body;
         console.log(id);
        let q=`UPDATE user SET  content =' ${content}' WHERE id= '${id}';`;
        

    connection.query(q,(err, result)=>{
        if (err) throw err;
        console.log(result);
        let user=result[0];
        res.redirect("/posts");
    } 
 );}catch(err){ 
        console.log(err);
    }
//heloo


   // let {id}=req.params;
    //let newContent=req.body.content;
    //let post=posts.find((posts)=>id==posts.id);
    //post.content=newContent
    //console.log(post.content);
    
     //res.redirect("/posts");
    


});
app.get("/posts/:id/edit",(req,res)=>{
     
   try{
        let {id} =req.params;
        console.log(id);

        let q=`select * from user where id='${id}'`;

    connection.query(q,(err, result)=>{
        if (err) throw err;
        console.log(result);
        let user=result[0];
        res.render("editPost.ejs",{user});
    } 
 );}catch(err){ 
        console.log(err);
    }




   // post=posts.find((posts)=>id==posts.id);

    //res.render("editPost.ejs",{post});




});
app.delete("/posts/:id",(req ,res)=>{
    
      try{
        let {id} =req.params;

        let q=`DELETE FROM user WHERE id =${id};`;

    connection.query(q,(err, result)=>{
        if (err) throw err;
        console.log(result);
        let user=result[0];
       res.redirect("/posts");
    } 
 );}catch(err){ 
        console.log(err);
    }
    
   // let {id}=req.params;
     //post=posts.find((posts)=>id==posts.id);
    //posts=posts.filter((posts)=>id!=posts.id);

   // res.redirect("/posts");


});



