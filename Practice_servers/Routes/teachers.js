const route=require('express').Router();

let teachers=[
            {name:"Arnav gupta", subject:"Webdev"},
            {name:"Prateeek Narang", subject:"Competitive Programming"},
];


route.get('/',(req,res)=>res.send(teachers))

route.get('/add',(req,res)=>{
    teachers.push({name:req.query.name,subject:req.query.subject})
    res.send(teachers)
})
route.get('/:id',(req,res)=>
{
    if(isNaN(parseInt(req.params.id)))
    next()
    else
    {
    if(req.params.id<0||req.params.id>teachers.length)
    res.send(`
    <html>
    <body>
    <h2 style="text-align: center">Not a valid <b>ID</b></h2><br>
    <h2 style="text-align: center">Enter an ID between 0 and ${teachers.length-1}</h2><br>
    </body>
    </html>`);
    else
    res.send(teachers[req.params.id])
    }
}
)

module.exports=route;