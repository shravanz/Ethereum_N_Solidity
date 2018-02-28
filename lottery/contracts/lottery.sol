pragma solidity ^0.4.17;

contract Lottery{
    address public manager;
    address[] public players;
    
    
    function Lottery() public{
        manager = msg.sender;    
    }
    
    
    function enter() public payable{
        require(msg.value > .01 ether); 
        players.push(msg.sender);
    }
    
    
    function random() private view returns(uint){
        return uint(keccak256(block.difficulty,now,players));//keccak256 is crypto algo just like SHA#    
    }
    
    
    function pickWinner() public onlyMangerCanCall {
        
        require(msg.sender == manager);
        
        uint index = random() % players.length;
        players[index].transfer(this.balance);
        players = new address[](0);
    }
    
    //modifier function is helping function which reduce repeated code
    modifier onlyMangerCanCall(){
        require(msg.sender == manager);
        _; //it mean rest of code continue inthe function after the validation
    }
    
    function getPlayers() public view returns (address[]){
        return players;
    }
}