const express = require('express');
const collection = require('../src/database');
const Users = require('../src/database');
const routerApp = express.Router();



routerApp.get('/',(req,res)=>{
    if(req.session.user){
        console.log("user alredy logined")
        res.redirect('/home');
    }else{
        if(req.session.passwordWrong){
            console.log("entered wrong password");
            req.session.passwordWrong=false;
            res.render('login' , {message: "Inavalid password"})
        }else if (req.session.needSignup){
            console.log('User need signup');
            req.session.needSignup = false;
            res.render('login', {message: "You need to Create new account or You entered invalid username"})
        }else{
            res.render('login');
        }
    }
})

routerApp.post('/home', async(req,res)=>{
    
     try{
        const check = await Users.findOne({name: req.body.username});
        if(check){
            const isPasswordMatch = await Users.findOne({name : req.body.username , password : req.body.password})
            if(isPasswordMatch){
                req.session.user = true;
                console.log("the verficstion succesful");
                res.redirect('/home');
            }else{
                console.log("the verficstion failed ,need to send a message to user sign up page.'the message is your passsword is incorrected' ");
                req.session.passwordWrong= true;
                res.redirect('/');
            }
        }else{
            console.log("the verficstion failed ,user dont have an acount here.need to send a message to user sign up page.'the message is your need signin for login' ");
            req.session.needSignup = true ;
            res.redirect('/');
        }
       }catch{
            res.send("The database not working please try after sometime")
       }
    })

routerApp.get('/home',(req,res)=>{

    if(req.session.user){
        console.log("Your home is here")
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
    if(req.session.existingUsername){
        res.render('signup' ,{message:"This username already existing"});
    }else if(req.session.accountCreated){
        res.render('login' ,{message:"Your Account created ,please login now"});
    }else{
        res.render('signup');
    }
    
})



routerApp.post('/signupuser',async (req,res)=>{
    console.log("3");
    const data = {
      name: req.body.username,
      password: req.body.password
    };
    
    try{
        console.log("4");
    // checking if the user data is already existing.
         const existData =  await Users.findOne({name : data.name});
        if(existData){
            req.session.existingUsername =true;
            console.log("Username already exists");
            res.redirect('/signupage');
         }else{
        console.log("5");
        const userData = await Users.insertMany(data);        
        console.log('your accound created');
        req.session.accountCreated =true;
        res.redirect('/signupage')
         }
        
        }catch(err) {
        
        console.log("THe error is " , err)
        return res.status(404).send('Error in creating account');
     }
    
    })




  module.exports= routerApp;