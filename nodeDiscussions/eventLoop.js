console.log("start")
process.nextTick(()=>{
    console.log("next tick")
})

setImmediate(()=>{
    console.log("set immediate")
})

console.log("end")