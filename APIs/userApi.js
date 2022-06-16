const express=require('express')
//create router
const userApiObject=express.Router()
const expressAsyncHandler=require("express-async-handler")
//import jsonwebtoken
const jwt=require('jsonwebtoken')

//for pwd hasing
const bcryptjs=require('bcryptjs')
//body parsing middleware
userApiObject.use(express.json());

//get userCollection object
let userCollection;
userApiObject.use((req,res,next)=>{
    userCollection=req.app.get("usercollection")
    next();
})


userApiObject.post("/register",expressAsyncHandler( async(req,res)=>{
    let newUser=req.body
    let user=await userCollection.findOne({username:newUser.username})
    if(user !== null){
        res.send({message:"Username already exist"})
    }
    else{
        let hashedPwd=await bcryptjs.hash(newUser.pwd,6)
        newUser.pwd=hashedPwd;
        userCollection.insertOne(newUser)
        res.send({ message: "User registred succesfully", payload: newUser.username })
    }
    
}))
//user login
userApiObject.get('/userLogin', expressAsyncHandler(async (req, res) => {
    let userCredentialsObj =JSON.parse(req.query.userObj);
    //find user by username
    let user = await userCollection.findOne({ username: userCredentialsObj.username })
    if (user === null) {
        res.send({ message: "Invalid username" })
    }
    else {
        //compare password
        let status = await bcryptjs.compare(userCredentialsObj.pwd, user.pwd)
        //if pwd not equal
        if (status === false) {
            res.send({ message: "Invalid password" })
        }
        else {
            //create and send token
            let signedToken = await jwt.sign({ username: user.username }, process.env.SECRETKEY, { expiresIn: '24h' })
            //send token as res
            res.send({ message: "success", token: signedToken, user: user })
        }
    }
}))


module.exports=userApiObject;