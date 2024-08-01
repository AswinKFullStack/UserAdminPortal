const express = require('express');
const collection = require('../src/database');
const Users = require('../src/database');
const routerApp = express.Router();

const user = "admin";
const pass = "password";

routerApp.get('/',(req,res)=>{
    if(req.session.user){
        console.log("session founded")
        res.redirect('/home');
    }else{
        if(req.session.passwordWrong){
            console.log("entered wrong password");
            req.session.passwordWrong=false;
            
            res.render('login' , {errormessage: "Inavalid password or username"})
        }else{
            console.log('no session data, login please')
            res.render('login')
        }
    }
})

routerApp.post('/home',(req,res)=>{
    const { username , password } = req.body;
    
    
    if(username === user && password === pass ){
        console.log(username,password,user,pass);
        req.session.user = req.body.username;
        console.log("the verficstion succesful");

        res.redirect('/home');
    }else{
        
       console.log("the verficstion failed");
       req.session.passwordWrong = true;
       req.session.user = false;
        res.redirect('/');
       
    }

    
})

routerApp.get('/home',(req,res)=>{

    if(req.session.user){
        console.log("yes this time to show homw")
        res.render('home');
    }else{
        
       res.render('login')
    }
})

routerApp.post('/logout',(req,res)=> {
    req.session.destroy();
    res.redirect('/');
})
routerApp.post('/signuppage',async (req,res)=>{
   console.log("1")
    res.redirect('/signupage');
})

routerApp.get('/signupage',(req,res)=>{
    console.log("2");
    res.render('signup');
})

routerApp.post('/signupuser',async (req,res)=>{
    console.log("3");
    const data = {
      name: req.body.username,
      password: req.body.password
    };
    console.log("4");
  
    try{
              console.log("5");
        const userData = await Users.insertMany(data);        
        res.send('your accound created');
        console.log(userData);
        console.log("6");

    }catch(err) {
        console.log("7");
        console.log("THe error is " , err)
        res.status(500).send('Error creating account');
    }
    
    
    
    
    
    console.log("6");
    
    
})




module.exports= routerApp;