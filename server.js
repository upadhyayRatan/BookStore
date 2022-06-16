//create express app
const express = require('express')
const app=express();

//import path module
const path=require('path')
//configure .env
require('dotenv').config()

//connect build of react app with express
app.use(express.static(path.join(__dirname,'./build')))

//import mongoDb
const mongoClient=require('mongodb').MongoClient;
//get database url
const dbUrl= process.env.DATABASE_URL;

//connect to database
mongoClient.connect(dbUrl,(err,client)=>{
    if(err){
        console.log("Error in db connect");
    }
    else{
        //get db objexct
        const dbObject=client.db('BookStore');
        //get collection object
        let userCollection=dbObject.collection("usercollection")
        let authorCollection=dbObject.collection('authorcollection')
        //set to app object
        app.set('usercollection',userCollection)
        app.set('authorcollection',authorCollection)
        console.log("Connected to db")
    }
})

//get userapiobj
const userapiobj=require('./APIs/userApi');
//get authorApiObj
const authorApiObj=require('./APIs/authorApi')

//path starts then execute
console.log('Helloooo')
app.use("/users",userapiobj)

app.use("/authors",authorApiObj)

//dealng with unmatched paths /rendering of page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './build', 'index.html'))
})

//error handling middleware for Asynchronous operation
app.use((err,req,res,next)=>{
    res.send({message:"Error",reason:err.message})
})

//assign port
const PORT= process.env.PORT;
app.listen(PORT,() =>console.log(`Server listening on port ${PORT}`))