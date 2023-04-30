var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

//dependencies
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))
//

mongoose.connect('mongodb://127.0.0.1:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}); //initializing connection to database

var db = mongoose.connection; //getting conncection from mongodb

db.on('error',()=>console.log("error in connecting to database"));
db.once('open',()=>console.log("connected to database"))

app.post("/sign_up", (req,res)=>{
    var name = req.body.name; //extracting data that we receive
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;

//storing the above as a single data object
    var data = {
        "name":name,
        "email": email,
        "phno": phno,
        "password": password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("record inserted successfully");
        });

    return res.redirect('signup_success.html')

})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*' //making localhost get the access
    })
    return res.redirect('index.html');
}).listen(3000);

console.log("listening on port 3000");