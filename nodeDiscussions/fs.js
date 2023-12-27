const fs = require("fs");

const path = require("path");

// create a file

// fs.writeFile('file.txt','hello world', (err)=>{
//     if(err) throw err;
//     console.log("file created")
// })

// fs.appendFile('file.txt','some additional text', (err)=>{
//     if(err) throw err;
//     console.log("file uodated")
// })

// fs.readFile('file.txt',(err,data)=>{
//     if(err) throw err;
//     console.log(data.toString())
// })

// create directory

// fs.mkdir(path.join(__dirname,'test'),(err)=>{
//     if(err) throw err;
//     console.log("directory created")
// })

// copy file
// const copyFrom = path.join(__dirname,'../','models','bookingModel.js');
// console.log(copyFrom)
// const destPath = path.join(__dirname,'bookingModelCopy.js');
// fs.copyFile(copyFrom,destPath,(err)=>{
//     if(err) throw err;
//     console.log("file copied")
// })

const filePath = path.join(__dirname, "big.file");
console.log(filePath);
const readableStream = fs.createReadStream(filePath);
const writableStream = fs.createWriteStream("anotherCopyOfBig.file");
// readableStream.on('data',(chunk)=>{
//     console.log(`Received ${chunk.length} bytes of data.`)
//     writableStream.write(chunk)
// })

// readableStream.on('end',()=>{
//     writableStream.end()
//     console.log("finsihed reading and writing the file")
// })

readableStream.pipe(writableStream);

readableStream.on("error", (err) => {
  console.log("error in reading file", err);
});

writableStream.on("error", (err) => {
  console.log("error in writing file", err);
});
