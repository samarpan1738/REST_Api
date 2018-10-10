const route=require('express').Router();

let students=[
            {name:"Saksham", college:"DTU",year:"1"},
            {name:"Rahul", college:"NSIT",year:"3"},
            {name:"Samarpan", college:"ABESIT",year:"2"}
];
//G E T #1

route.get('/',(req,res)=>res.send(students))

//G E T #2

route.get('/:id',(req,res)=>
{
    if(req.params.id<0||req.params.id>students.length)
    res.send(`
    <html>
    <body>
    <h2 style="text-align: center">Not a valid <b>ID</b></h2><br>
    <h2 style="text-align: center">Enter an ID between 0 and ${students.length-1}</h2><br>
    </body>
    </html>`);
    else
    res.send(students[req.params.id])
}
)

//P O S T - R E Q U E S T S

route.post('/', (req,res)=>
{
    students.push({
        name: req.body.name, 
        college: req.body.college,
        year: req.body.year
    })
    res.send(students)
})

//P A T C H - R E Q U E S T S

route.patch('/:id', (req,res)=>
{
    if(req.params.id>-1 && req.params.id<students.length)
    {
    students[req.params.id]={
        name: req.body.name, 
        college: req.body.college,
        year: req.body.year
    }
    }
    res.send(students)
})

//D E L E T E - R E Q U E S T S

route.delete('/:id',(req,res)=>
{
    let index=req.params.id;
    if(index>-1 && index<students.length)
    {
        students.splice(index,1);
    }
    res.send(students)
})

module.exports=route;