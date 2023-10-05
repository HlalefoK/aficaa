import React, { useState } from 'react';
import Web3 from 'web3'; 
import './Trading.css';

const ICOComponent = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const loadBlockchainData = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);

      try {
        // Request account access if needed
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Your ICO contract ABI and address
        const contractABI = [
          // ... your contract ABI as provided
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_totalTokens",
                "type": "uint256"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "name": "balances",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "owner",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "totalTokens",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "participate",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          }
        ];
        const contractAddress = '0x0ba48f2525c521d5ddf9c0b9718375ed7c6044b0'; // ICO Smart Contract Address

        // Instantiate the ICO contract
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        setContract(contract);
      } catch (error) {
        console.error('Error accessing Ethereum accounts:', error);
      }
    } else {
      console.error('Please install MetaMask to participate in the ICO.');
    }
  };

  const participateInICO = async () => {
    try {
      // Convert the input amount to wei (1 Ether = 1e18 wei)
      const amountInWei = web3.utils.toWei(amount.toString(), 'ether');

      // Send transaction to participate in the ICO
      await contract.methods.participate().send({
        from: (await web3.eth.getAccounts())[0],
        value: amountInWei,
      });

      setMessage('Successfully participated in the ICO!');
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div class = "main">

  <div class="topnav">
    <a class="active" href="#home">Available campaigns</a>
    <a href="#news">view Tokens</a>
    <a href="#news">Benefits</a>
    <a href="#contact">Contact</a>
    <a href="#about">About</a>
  </div>

      
      <h1>ICO Particiation</h1>
      <button class = "btnW" onClick={loadBlockchainData}>Activate wallet</button><br />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter Ether amount"
      />
      <button onClick={participateInICO}>Participate</button>
      <p>{message}</p>
    </div>

    
    
  );
};

export default ICOComponent;
