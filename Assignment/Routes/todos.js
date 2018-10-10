const route=require('express').Router();

let todos=[{task:"Code",done:"Yes"},{task:"Repeat",done:"No"}];

//G E T #1 =>"A L L - T O D O S"

route.get('/',(req,res)=>
{
    res.send(todos);
});

//G E T #2 =>"S P E C I F I C - T O D O"

route.get('/:id',(req,res)=>
{
    let index=req.params.id;
    if(index>-1 && index<todos.length)
    res.send(todos[index]);
    else
    res.send(
        `
        <html>
        <title>Wrong Id!!</title>
        <body>
        <h3 style="align-items:center">Enter an id between ${0} & ${todos.length}</h3>
        </body>
        </html>
        `
    )
});

//P O S T - R E Q U E S T

route.post('/',(req,res)=>
{
    todos.push({task:req.body.task,done:req.body.done});
    res.send(todos);
})

//P A T C H -  R E Q U E S T S

route.patch('/:id',(req,res)=>
{
    let index=req.params.id;

    if(index>-1 && index<todos.length)
    todos[req.params.id]={task:req.body.task,done:req.body.done}

    res.send(todos)
})

//D E L E T E - R E Q U E S T S

route.delete('/:id',(req,res)=>
{
    let index=req.params.id;

    if(index>-1 && index<todos.length)
    todos.splice(index,1);

    res.send(todos);
    
}
)

// D E L E T E - A L L

route.delete('/',(req,res)=>
{
    todos=[];

    res.send(todos);
    
}
)

//E X P O R T I N G - R O U T E

module.exports=route;