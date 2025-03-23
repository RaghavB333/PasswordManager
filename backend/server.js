const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const bodyparser=require('body-parser')
const cors=require('cors')
dotenv.config()

// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'mypassman';
const app = express()
const port = 3000
app.use(bodyparser.json())
app.use(cors())

client.connect();


require('dotenv').config()
//Get all the passwords
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');

    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

//save a password
app.post('/', async (req, res) => {
    const password=req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success:true,result:findResult})
})

//delete a password
app.delete('/', async (req, res) => {
    const password=req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({success:true,result:findResult})
})



app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})