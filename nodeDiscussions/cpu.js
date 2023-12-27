const express = require('express');

const cors =   require('cors');
const app = express();

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
    const result = calculateFibonacci(number);
    res.status(200).json({
        message:result,
        status:'success',
        'requestNumber':requestNumber
    });
 })

 app.listen(3000, () => {
    console.log('Server listening on asd port 3000');
 })
 