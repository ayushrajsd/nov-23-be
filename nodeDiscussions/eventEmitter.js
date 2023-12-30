const eventEmitter = require('events');

const myEmitter = new eventEmitter();

/** listeners */
myEmitter.on('myEvent',(...args)=>{
    console.log('myEvent was emitted with args',args)
})

/** another listener */
const secondCB = (...args)=>{
    console.log('another version of myEvent was emitted with args',args)
    console.log('****************')}

myEmitter.on('myEvent',secondCB)

myEmitter.emit('myEvent')
myEmitter.emit('myEvent',1,2)

myEmitter.off('myEvent',secondCB)
myEmitter.emit('myEvent',[1,2,3])
