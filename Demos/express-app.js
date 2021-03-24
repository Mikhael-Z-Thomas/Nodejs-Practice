const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const Blog = require('./models/blog');
const { render } = require('ejs');


const dbURI = 'mongodb+srv://likemike:likemike3372@tutorial.zpkym.mongodb.net/Tutorial?retryWrites=true&w=majority'
mongoose.connect(dbURI)
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err))

// express app
const app = express();

// listen for requests


// register view engine
app.set('view engine', 'ejs');

app.use(express.static('public-static'));
app.use(express.urlencoded({extended:true}));
// app.use((req,res,next)=>{
//   console.log('new request');
//   console.log(req.hostname);
//   console.log(req.path);
//   console.log(req.method);
//   next();
// })

app.use(morgan('dev'));


app.get('/add-blog',(req,res)=>{
    const blog = new Blog({
        title:'yuno',
        snippet:'about new blog',
        body:'more about black clover'
    });
    blog.save()
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            res.send(err);
        });
})

app.get('/blogs',(req,res)=>{
    Blog.find()
        .then((result)=>{
            res.render('index',{title:'All Blogs',blogs:result})
        })
        .catch((err)=>{
            console.log(err);
        });
});

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

app.get('/blogs/:id',(req,res)=>{
  const id = (req.params.id);
  res.send();
  //  Blog.findById()
  //   .then((result)=>{
  //     console.log(id);
  //   })
  //   .catch(err=>{
  //     console.log(err);
  //   });
});


//adding new blogs
app.post('/blogs',(req,res)=>{
    const blog = new Blog(req.body);

    blog.save()
        .then((result)=>{
            res.redirect('/blogs');
        })
        .catch((err)=>{
            console.log(err);
        })
})

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
