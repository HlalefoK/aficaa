module.exports = {
    networks: {
      development: {
        host: "127.0.0.1",
        port: 8545, // Use the correct port number for your local Ethereum node
        network_id: "*", // Match any network id
      },
    },
    compilers: {
      solc: {
        version: "0.8.0", // Specify the Solidity compiler version you are using
      },
    },
  };
  