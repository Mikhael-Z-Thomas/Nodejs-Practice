const fs = require('fs');

fs.readFile('blog.txt',(err,data)=>{
    if(err)
    {
        console.log(err);
    }
    console.log(data.toString());
})

fs.writeFile('blog2.txt','yolo',()=>
{
    console.log('written');
})

if(fs.existsSync('blog2.txt'))
{
    fs.unlink('blog2.txt',(err)=>{
        if(err)
            console.log(err);
        
        console.log('deleted');    
    });
}