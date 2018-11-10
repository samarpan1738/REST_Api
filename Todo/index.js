const express=require('express');
const srv=express();

//D E C O D E R S

srv.use(express.json());
srv.use(express.urlencoded({extended:true}));

//G E T T I N G - R O U T E R(S)
const todosRoute=require('./Routes/todos');

//M I D D L E - W A R E S

srv.use('/todos',todosRoute);

//4 0 4 - H A N D L E R

srv.use((req,res)=>{
    res.send(`
    <html>
    <body>
    <h2>404!Page Not Found</h2>
    </body>
    </html>
    `)
});

srv.listen(1111);