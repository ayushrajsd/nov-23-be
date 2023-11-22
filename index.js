const express = require('express');
const app = express();

app.use(express.json()) // inbuilt middleware

// app.use(function(req,res){
//     res.status(200).send('Hello Node World')
// })

app.use(function(req, res, next){
    console.log("middleware")
        next()
})

app.use((req, res, next)=>{
    console.log("middleware2")
    next()
})

app.get('/api/user',(req, res)=>{
    console.log("get")
    res.json({
        status:200,
        data: {
            name: 'John',
            age: 30
        }

    })
})

app.post('/api/user',(req, res)=>{
    console.log("post")
    console.log(req.body)
    res.json({
        status:200,
        data: req.body
    })
})

app.use((req, res)=>{
    res.status(404).json({
        status:404,
        message: 'Page not found'
    })
})






app.listen(3000, () => console.log('listening at 3000'));