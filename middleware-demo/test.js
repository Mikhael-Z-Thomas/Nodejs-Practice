const express = require('express');
const app = express();



const requireJsonContent = () => {
  return (req, res, next) => {
    if (req.headers['content-type'] !== 'application/json') {
        res.status(400).send('Server requires application/json')
    } else {
      next()
    }
  }
}

app.get('/', (req, res, next) => {
  res.send('Welcome Home');
});

app.post('/', requireJsonContent(), (req, res, next) => {
  res.send('You sent JSON');
})

app.listen(3000);