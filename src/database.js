const mongoose =  require("mongoose");
const { type } = require("os");
const { setThePassword } = require("whatwg-url");
//const connect = mongoose.connect('mongodb://localhost:27017//UserDatabase');
mongoose.connect('mongodb://localhost:27017/UserDatabase', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

    
db.on('error', (err) => {
    console.error(err);
  });
  
  db.once('open', () => {
    console.log("Database connected Successfully");
  });

const  LoginSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
});

//collection Part 
const Users = mongoose.model("Users", LoginSchema);
module.exports = Users;