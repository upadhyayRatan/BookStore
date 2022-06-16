const express=require("express")
const authorApiObj=express.Router()
const expressAsyncHandler=require("express-async-handler")

//get token
const checkToken=require('../middlewares/verifyToken')
authorApiObj.use(express.json())
//get authorCoollection object
let authorCollection;
authorApiObj.use((req,res,next)=>{
    authorCollection=req.app.get("authorcollection")
    next();
})

authorApiObj.get('/get-authors',checkToken,expressAsyncHandler(async(req,res)=>{
    let authors=await authorCollection.find().toArray()
    res.send({payload:authors})
}))

//add author
authorApiObj.post('/add-author',checkToken,expressAsyncHandler(async(req,res)=>{
    let newAuthor=req.body
    let authorName=newAuthor.name;
    let authorResponse=await authorCollection.findOne({name:new RegExp('^' +authorName + '$', 'i')})//case insensitive search
    if(authorResponse !== null){
        res.send({message:"Author name already exist"})
    }
    else{
        authorCollection.insertOne(newAuthor)
        res.send({ message: "Author added succesfully"})
    }
}))

//add books for author
authorApiObj.post('/add-books',checkToken,expressAsyncHandler(async(req,res)=>{
    let newBook=req.body
    let authorName=newBook.authorName;
    let book={
        name:'',
        price:0,
        publishDate:undefined
    }
    book.name=newBook.name;
    book.price=newBook.price;
    book.publishDate=newBook.publishDate;

    let authorResponse=await authorCollection.findOne({name:new RegExp('^' +authorName + '$', 'i')})//case insensitive search
    if(authorResponse !== null){

       //let duplicateBook=authorCollection.find({books: {$elemMatch: {name:book.name}}})
       let duplicateBook=await authorCollection.findOne({"books.name":book.name})

       if(duplicateBook !==null){
           res.send({message:"book already added"})
       }
       else{
        let responseBook=await authorCollection.updateOne({name:authorName},{$push:{books : {$each : [book]}}})
        console.log("Response of add book",responseBook )
        res.send({message:"Book added successfully"})

       }
       console.log("Duplicate book reponse",duplicateBook)

    }
    else{
        res.send({ message: "Add author first as provided author does not exist"})
    }
}))

//delete a book
authorApiObj.post('/delete-book',checkToken,expressAsyncHandler(async (req,res)=>{
let book=req.body.book;
let authorName=req.body.author;
console.log("book to delete",req.body)
let response=await authorCollection.updateOne({name:authorName},{$pull:{ books:{ $in : [book]} }  });
let newBooks = await authorCollection.findOne({ name: authorName })
res.send({message:"Deleted succesfulyy",payload:newBooks})


}))


module.exports =authorApiObj;