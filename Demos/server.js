const http = require('http');
const fs = require('fs');
const _ = require('lodash');


const server = http.createServer((req,res)=>{
    console.log('request made');

    //res.setHeader('Content-Type','text/html');

    fs.readFile('./views/index.html',(err,data)=>{
        if(err)
        {
            console.log(err);
            res.end();
        }
        else
        {
            res.write(data);
            res.end();
        }
    })

})

const num = _.random(0,20);
console.log(num);

const greet = _.once(()=>{
    console.log('yolo');
})

greet();
greet();

server.listen(3000,'localhost',()=>console.log('server is running'));