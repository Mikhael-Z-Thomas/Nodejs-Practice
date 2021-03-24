const express = require('express');

const uuid = require('uuid');
const router = express.Router();

const members = require('../../members')

router.get('/:id',(req,res)=>{

    const found = members.some(member=>member.id===parseInt(req.params.id));

    if(found)
    res.send(members.filter(member=>member.id===parseInt(req.params.id)));
    else
    res.status(400).json({'Error':"404 not found"});
})

router.get('/',(req,res)=>{
    res.json(members);
})

router.post('/',(req,res)=>{
    const newMember = {
        id:uuid.v4(),
        name:req.body.name,
        Age:req.body.Age
    }

    if(!newMember.name)
       return res.status(400).json({'message':'Error pls add name'});

    members.push(newMember);
    res.send(members);    
})

router.put('/:id',(req,res)=>{
    const found = members.some(member=>member.id===parseInt(req.params.id));

    if(found)
    {
        const updMember = req.body;
        members.forEach(member=>{
            if(member.id===parseInt(req.params.id))
            {
                member.name = updMember.name?updMember.name:member.name;
                member.Age = updMember.Age?updMember.Age:member.Age;
                res.json({"message":"Updated",member});
            }
        });
    }else
    {
        res.status(400).json({'message':'Error'});
    }
})

module.exports = router;