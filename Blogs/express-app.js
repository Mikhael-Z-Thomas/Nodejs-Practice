const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');

const { render } = require('ejs');

const app = express();

const blogRoutes = require('./routes/blogRoutes')
const dbURI = 'mongodb+srv://likemike:likemike3372@tutorial.zpkym.mongodb.net/Tutorial?retryWrites=true&w=majority'
mongoose.connect(dbURI)
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err))

// express app


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
app.use('/blogs',blogRoutes);
app.get('/', (req, res) => {
  res.redirect('/blogs');
});


//about page
app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

