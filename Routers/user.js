const express = require('express');
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




module.exports= routerApp;