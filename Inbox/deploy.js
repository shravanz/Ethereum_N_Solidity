const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'danger room aerobic penalty aim mechanic gadget alert cube flavor slight output',//metamask nuemonics for pub & priv keys
    'https://rinkeby.infura.io/wbIgrSZzs8Wu9ukBnYgb'//connecting to rinkeby network with infura network APIs
);
const web3 = new Web3(provider); // pass on to web3 libraray

const deploy = async () => {

    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

const result  = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['HelloThere!'] }) 
        .send({ gas: '1000000',from: accounts[0] });
console.log('Contract deployed',result.options.address);


};
deploy();
//output
//Attempting to deploy from account 0x12aFcdc6eE1422D3f8bAF51A040c9bd85Bc4f128
//After some time
//Contract deployed 0x7F2765154015d338F5a6A887F62100F093818596