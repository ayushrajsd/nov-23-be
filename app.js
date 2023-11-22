const express = require('express');
const app = express();
const fs = require('fs');
const short = require('short-uuid')


app.use(express.json())
const data = fs.readFileSync("./data.json", "utf-8")
const userData = JSON.parse(data)
// console.log(userData)

app.get('/api/users', (req, res) => {
    try{
        if(userData.length === 0){
            throw new Error("No data")
        }else {
            res.status(200).json({
                message: "success",
                data: userData
            })
        }

    }catch(err){
        res.status(500).json({
            message: "error",
            data: err.message
        })
    }
    
})

app.post('/api/users', (req, res) => {
    try{
        const id = short.generate()
        const userDetails = req.body
        userDetails.id = id
        const isEmpty = Object.keys(userDetails).length === 0
        if(isEmpty){
            throw new Error("No data")
        }
        console.log("userDetails", userDetails)
        userData.push(userDetails)
        fs.writeFile("./data.json", JSON.stringify(userData), (err) => {
            if(err){
                throw new Error("Error writing file")
            }else {
                res.status(200).json({
                    message: "success",
                    data: userDetails
                })
            }
        })
        // res.json({
        //     message: "success",
        //     status: 200,
        //     data: userDetails
        // })

    } catch(err){
        res.status(500).json({
            message: "error",
            data: err.message
        })
    }
})

app.get('/api/users/:id', (req, res) => {
    console.log(req.params)
    const {id} = req.params
    try{
        const user = userData.find((user) => user.id == id)
        console.log("user", user)
        res.status(200).json({
            message: "success",
            data: user
        })
    }catch(err){
        res.status(500).json({
            message: "error",
            data: err.message
        })
    }
})



app.listen(3000, () => console.log('listening at 3000'));