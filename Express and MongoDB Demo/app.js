const express = require('express');

const app = new express();

const bodyparser = require('body-parser');

const mongoose = require('mongoose');

const postRoutes = require('./routes/posts');



require('dotenv/config')



mongoose.connect(process.env.DB_CONNECTION,
{ useUnifiedTopology: true, useNewUrlParser: true },()=>console.log("Connected"))

app.use(bodyparser.json());

app.use('/posts',postRoutes);

app.get('/',(req,res)=>{
    res.send('Welcome');
})


app.listen(3000);