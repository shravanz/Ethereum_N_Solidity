const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname,'contracts','Inbox.sol');//To the get the directory path of Inbox.sol file
const source = fs.readFileSync(inboxPath,'utf8');

//Here the "Number" indicates number of contracts to be complied 
module.exports = solc.compile(source,1).contracts[':Inbox'];