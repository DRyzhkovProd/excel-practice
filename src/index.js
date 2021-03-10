import './scss/main.scss'
console.log('hi');

async function start(){
     return Promise.resolve('work?')
}
start().then(console.log)