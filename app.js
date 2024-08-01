const express = require('express');
const session = require('express-session');
const nocache = require('nocache');
const routes = require('./Routers/user');
const app = express();
const hbs = require('hbs');
const PORT = 3001;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public') );
app.set('view engine', 'hbs');

app.use(session({
    secret:'keyboard cat',
    resave : false , 
    saveUninitialized : true ,
}))

app.use(nocache());
app.use('/',routes);


app.listen(PORT,()=>{
    
    console.log("server running ");
})
