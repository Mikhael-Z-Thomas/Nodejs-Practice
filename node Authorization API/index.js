const express = require('express');
const jwt = require('jsonwebtoken');

const app = new express();

app.get('/api',(req,res)=>{

    res.json({
        message:"Welcome to API!!!"
    })
});

app.post('/api/posts',verifytoken, (req,res)=>{

    jwt.verify(req.token,'secretkey',(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message:'Post Created',
                authData:authData
            })
        }
    })

    res.json({
        message:"Post Created"
    });
});

function verifytoken(req,res,next)
{
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader!=='undefined')
    {
        const bearer = bearerHeader.split(' ');

        const bearerToken = bearer[1];

        req.token = bearerToken;

        next();

    }else{
        res.sendStatus(403);
    }

}

app.post('/api/login',(req,res)=>{
    const user = {
        id:1,
        username:'asta',
        email:'asta@gmail.com'
    }
    jwt.sign({user:user},'secretkey',(err,token)=>{
        res.json({
            token:token
        });
    });
});

app.listen(3000,()=>console.log('server running'));