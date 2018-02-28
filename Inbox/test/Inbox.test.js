const assert = require('assert');
const ganache = require('ganache-cli');//local ethereum kinda of network
const Web3 = require('web3');//Captial "W" Stands for class/constructors
//provider is a interface betw web3 instance and ganache network
const provider = ganache.provider();
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile.js');

let accounts;
let inbox;
const INITIAL_STRING = 'Hi There!';
beforeEach(async () => {
    //Get a list of all accounts
    accounts = await web3.eth.getAccounts()
    // .then(fetchedAccounts =>{
    //     console.log(fetchedAccounts);
    // });

    //use one of those accounts to deploy contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi There!'] })
        .send({ from: accounts[0], gas: '1000000' })


});

describe('Inbox Contract', () => {
    it('DEPLOYS a CONTRACT', () => {
        // console.log(accounts);
        //  console.log(inbox);
        assert.ok(inbox.options.address);
    });
    it("It has default message", async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi There!');
    });

    it('can change the message', async () => {
        await inbox.methods.setMessage('Bye There!').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Bye There!');
    });
});











//====SAmple MOCHA TEst==========
// class Car {
//     park(){
//         return 'stopped';
//     }
//     drive(){
//         return 'vroom';
//     }
// }

// let car;
// beforeEach(()=>{
//      car = new Car(); 
// });

// describe('Car Class',()=>{
// it('can drive',()=>{
//    assert.equal(car.park(),'stopped');
// });

// it('can drive',()=>{
//     //const car = new Car();
//     assert.equal(car.drive(),'vroom');
// });
// });

// pragma solidity ^0.4.17;

