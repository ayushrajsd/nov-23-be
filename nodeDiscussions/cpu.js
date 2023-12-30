const express = require('express');

const cors =   require('cors');
const app = express();
const path = require('path');
const {fork} = require('child_process');

function calculateFibonacci(number) {
    if (number <= 1) {
        return number;
    }
    return calculateFibonacci(number - 1) + calculateFibonacci(number - 2);
 }

 app.use(cors());
 app.get('/fib', (req, res) => {
    const {number, requestNumber} = req.query;
    console.log("request number ",requestNumber)
    // const result = calculateFibonacci(number);
    // create a child process
    const fiboRes = fork(path.join(__dirname, 'fiboWorker.js'));
    fiboRes.send({number:parseInt(number)});
    fiboRes.on('message', (result) => {
        console.log("result ",result)
        res.status(200).json({
            message:result,
            status:'success',
            'requestNumber':requestNumber
        });
        // kill the child process
        fiboRes.kill();
    })
    // res.status(200).json({
    //     message:result,
    //     status:'success',
    //     'requestNumber':requestNumber
    // });
 })

 app.listen(3000, () => {
    console.log('Server listening on asd port 3000');
 })
 