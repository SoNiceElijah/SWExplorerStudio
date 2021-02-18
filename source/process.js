
const calculate = require('./equation');
const PROCESSES = {};

function makeprocess(ctx) {

    let pid = Math.floor((Math.random() * 1000)).toString().padStart(3,'0') + 
    '-' + Math.floor((Math.random() * 1000)).toString().padStart(3,'0') + 
    '-' + Math.floor((Math.random()).toString().padStart(3,'0'));
    PROCESSES.push({ active : true, id : pid, proc : 0 });

    calculate(ctx.consts, () => {}, () => { return false; });

    return pid;
};
module.exports = makeprocess;