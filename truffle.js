//var HDWalletProvider = require("truffle-hdwallet-provider");
//var mnemonic = "fence vapor genius reopen polar consider visa spawn indicate figure normal swim";

module.exports = {
      networks: {
          development: {
              host: "localhost",
              port: 8545,
              network_id: "*" // Match any network id
          },
          rinkeby: {
            host: "localhost",
            port: 8545,
            from: "0x88d25dE3ceACa489aeb673cFf4AA744e838a8aAC",
            network_id: 4,
            gas: 4612388
        /*  },
          infura: {
            provider: function() {
              return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/tm3DORiJ8Gq7H4ebjIlk")
            },
            network_id: 4,
            gas: 4612388 **/
          }
      }
};
