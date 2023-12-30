// const {exec} = require('child_process')

// exec('ls -lh',(err,stdout,stderr)=>{
//     if(err){
//         console.log(`Error: ${err}`)
//         return
//     }
//     console.log(`stdout: ${stdout}`)
//     console.log(`stderr: ${stderr}`)
// })

/** execFile */
// const {execFile} = require('child_process')
// const scriptPath = "./script.sh"

// const args = ['args1','args2']

// execFile(scriptPath,args,(err,stdout,stderr)=>{
//     if(err){
//         console.log(`Error: ${err}`)
//         return
//     }
//     console.log(`stdout: ${stdout}`)
//     console.log(`stderr: ${stderr}`)
// })

/** spawn */

const {spawn} = require('child_process')

spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",["https://www.youtube.com","--incognito"])