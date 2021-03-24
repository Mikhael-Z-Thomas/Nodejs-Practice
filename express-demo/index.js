const express = require('express');
//const exphbs  = require('express-handlebars');
const Joi = require('joi')
const path = require('path');
const logger = require('./middleware/logger');
const app = new express();

app.use(express.json());

const courses = [
    {id:1,name:'course1'},
    {id:2,name:'course2'},
    {id:3,name:'course3'}
];



app.use('/api/members',require('./routes/api/members'));

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));


//app.use(logger);
app.use(express.static(path.join(__dirname,'public')));



app.get('/',(req,res)=>{
    res.send('Hello worldads');
})

app.get('/api/courses',(req,res)=>{
    res.send(courses);
})
app.get('/api/courses/:id',(req,res)=>{
    const co = courses.find(c=>c.id===parseInt(req.params.id));
    if(!co) res.status(404).send('Not Found');
    res.send(co);

})

app.post('/api/courses',(req,res)=>{

    const {error} = validate(req.body);   

    if(error)
    {
        res.status(400).send(result.error.details);
    }

    //console.log(result);

    const course = {
        id:courses.length+1,
        name:req.body.name
    }
    courses.push(course);
    res.send(courses);
})
app.get('/api/courses/:year/:month',(req,res)=>{
    res.send(req.query);
})

app.put('/api/courses/:id',(req,res)=>{

    const course = courses.find(c=>c.id===parseInt(req.params.id));
    if(!course)
        res.status(400).send('Not Found');


    const {error} = validate(req.body);    

    if(error)
    {
        res.status(400).send(result.error.details);
        return;
    }

    course.name = req.body.name;
    res.send(course)

})

app.delete('/api/courses/:id',(req,res)=>{
    const course = courses.find(c=>c.id===parseInt(req.params.id));
    if(!course)
        res.status(400).send('Not Found');

    const index = courses.indexOf(course);
    courses.splice(index,1);
    
    res.send(course);
})

function validate(course)
{
    const schema = {
        name:Joi.string().min(3).required()
    }    

    return Joi.validate(course,schema);
}

const port = process.env.PORT||3000;
app.listen(port,()=>console.log(`server running ${port}`));