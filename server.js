import express from "express";
import mongoose from 'mongoose';
import Cors from 'cors';
import bodyParser from "body-parser";
// require('dotenv').config();
import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV === 'production' });
import cards from './dbCards.js';


// app.use(bodyParser.json())


const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(Cors());

const connection_url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vbw8r.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(connection_url,{
    useNewUrlParser: true,
    useCreteIndex: true,
    useUnifiedTopology: true,
});

app.get('/',(req,res)=>{
    res.status(200).send('Hello World');
})

app.post('/tinder/cards',(req,res)=>{
    const dbCard = req.body;
    cards.create(dbCard,(err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
});

app.get('/tinder/cards',(req,res)=>{
    cards.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    });
});

app.listen(port,()=>{
    console.log(`Listening on localhost: ${port}`);
})

