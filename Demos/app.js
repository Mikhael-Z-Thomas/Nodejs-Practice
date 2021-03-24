// const Logger = require('./logger');
// const logger = new Logger();

// logger.on('messageLogged',(args)=>{
//     console.log('listened ',args);
// })

// logger.log('xx');


// const EventEmitter = require('events');
// const emitter = new EventEmitter();


const Person = require('./person');
const person = new Person("Mikhael",3);

person.greeting();
const path = require('path')
const fs = require('fs');
fs.mkdir(path.join(__dirname,'/test'),{},(err)=>{
    if(err)
        throw err;
    console.log("work");    
});

fs.writeFile(path.join(__dirname,'/test','hello.txt'),'Hello World!',(err)=>{
    if(err)
        throw err;
    console.log("work");    
});