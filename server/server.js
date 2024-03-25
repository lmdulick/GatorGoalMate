// var cors = require('cors')
// const express = require('express')
// const app = express()

// app.use(cors())

// app.get("/api", (req, res) => {
//     res.json({"users": ["userOne", "userTwo", "userThree", "userFour"]})
// })

// app.listen(5000, () => { console.log("Server started on port 5000") })

// express local host: http://localhost:5000/api/



var Express = require("express");
var Mongoclient=require("mongodb").MongoClient;
var cors=require("cors");
const multer=require("multer");

var app=Express();
app.use(cors());

var CONNECTION_STRING="mongodb+srv://lmd:SWE1!@mongodb.tzduiqh.mongodb.net/?retryWrites=true&w=majority&appName=MongoDB"

var DATABASENAME="GGMDB";
var database;

app.listen(5000,()=>{
    Mongoclient.connect(CONNECTION_STRING,(error,client)=>{
        if (error) {
            console.error("Error connecting to MongoDB:", error);
            return;
        }
        database=client.db(DATABASENAME);
        console.log("MongoDB Connection Successful");
    });
})

app.get('/api/GGMDB/',(request,response)=>{
  database.collection("GGM-Collection1").find({}).toArray((error,result)=>{
    response.send(result);
  });
})



// express local host: http://localhost:5000/api/GGMDB/





// var cors = require('cors')

// const express = require('express')
// const app = express()

// app.use(cors())

// app.get("/api", (req, res) => {
//     res.json({"users": ["userOne", "userTwo", "userThree", "userFour"]})
// })

// const server = app.listen(0, () => {
//     console.log(`Server running on port ${server.address().port}`);
//   });
  
// // express local host: http://localhost:INSERT_PORT_NUMBER/api