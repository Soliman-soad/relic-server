const express = require('express');
const cors = require('cors');
const { MongoClient,ObjectId } = require('mongodb');
const { response } = require('express');
require('dotenv').config();
const app =express();
const port = process.env.PORT || 5000;


app.use(cors())
app.use(express.json())

console.log(process.env.DB_userName,process.env.DB_password)

const uri =`mongodb+srv://${process.env.DB_userName}:${process.env.DB_password}@cluster0.ebizugo.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri)




async function run(){

    try{

        const BooksDatabase= client.db('RelicBooks').collection('books');
        const UserDatabase= client.db('RelicBooks').collection('user');
        
        
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
