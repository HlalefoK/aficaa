pragma solidity ^0.8.0;

contract ICO {
    address public owner;
    uint256 public totalTokens;
    mapping(address => uint256) public balances;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor(uint256 _totalTokens) {
        owner = msg.sender;
        totalTokens = _totalTokens;
    }

    function participate() external payable {
        require(msg.value > 0, "Please send some Ether");
        require(totalTokens >= msg.value, "Not enough tokens left for sale");

        balances[msg.sender] += msg.value;
        totalTokens -= msg.value;
    }

    function withdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
