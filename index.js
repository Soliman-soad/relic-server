const express = require('express');
const cors = require('cors');
const { MongoClient,ObjectId } = require('mongodb');
const { response } = require('express');
require('dotenv').config();
const app =express();
const port = process.env.PORT || 5000;


app.use(cors())
app.use(express.json())


const uri =`mongodb+srv://${process.env.DB_userName}:${process.env.DB_password}@cluster0.ebizugo.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri)




async function run(){

    try{

        const BooksDatabase= client.db('RelicBooks').collection('books');
        const UserDatabase= client.db('RelicBooks').collection('user');
        const CategoryDatabase= client.db('RelicBooks').collection('category');

        app.get('/advertiseBooks',async(req,res)=>{
            const cursor = BooksDatabase.find({}).limit(3)
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/books',async(req,res)=>{
            const cursor = BooksDatabase.find({})
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/category',async(req,res)=>{
            const cursor = CategoryDatabase.find({})
            const result = await cursor.toArray()
            res.send(result)
        })
       
        app.post('/books',async(req,res)=>{
            const book = req.body;
            const result = await BooksDatabase.insertOne(book);
            res.send(result);
        })
        app.post('/user',async(req,res)=>{
            const review = req.body;
            const cursor = await UserDatabase.find({email: review.email}).toArray()
            if(cursor.length===0){
                const result = await UserDatabase.insertOne(review);
                res.send(result);
            }
        })
        app.get('/user',async(req,res)=>{
            const email = req.query.email            
            const cursor = await UserDatabase.find({email: email}).toArray()
            res.send(cursor)
        })
        app.get('/sellers',async(req,res)=>{
            const cursor = await UserDatabase.find({role: "seller"}).toArray()
            res.send(cursor)
        })
        app.get('/buyers',async(req,res)=>{
            const cursor = await UserDatabase.find({role: "buyer"}).toArray()
            res.send(cursor)
        })
        app.delete('/buyers/:id',async(req,res)=>{
            const id = req.params.id;
            const query ={
                _id : ObjectId(id)
            }
            const result = await UserDatabase.deleteOne(query);
            res.send(result)

        })
        app.delete('/sellers/:id',async(req,res)=>{
            const id = req.params.id;
            const query ={
                _id : ObjectId(id)
            }
            const result = await UserDatabase.deleteOne(query);
            res.send(result)

        })
        
    }catch(err){
        console.log(err.message);
    }
}
run()

app.get('/', (req,res)=>{
    res.send('this is a Relic data base')
})

app.listen(port, ()=>{
    console.log('the app is running at port',port);
})
