// // Generate random content
// const content = Math.random().toString(36).repeat(10000000); // Approximately 130MB


// // Write content to file
// fs.writeFileSync('/Users/scaler/Documents/BEAug16/Nov-22/nodeDiscussions/big.file', content);
// console.log(__dirname)

// console.log(global)
// console.log("dir name",__dirname, "file name",__filename)
// console.log(process)

const { clear } = require('console');
const http = require('http');
const server = http.createServer();
const fs = require('fs');

server.on('request', (req, res) => {
    // fs.readFile('./big.file',(err, data)=>{
    //     if(err) throw err;
    //     res.end(data)
    // })
    const src = fs.createReadStream('./big.file');
    src.pipe(res);
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
})


