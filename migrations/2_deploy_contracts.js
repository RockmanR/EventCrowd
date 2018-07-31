//var TutorialToken = artifacts.require("TutorialToken");
const RefundableGCC = artifacts.require('./RefundableGCC.sol');
const GustavoCoin = artifacts.require('./GustavoCoin.sol');

module.exports = function(deployer, network, accounts) {
    const openingTime = web3.eth.getBlock('latest').timestamp + 60*5; // five secs in the future
    const closingTime = openingTime + 60*5; // time in the future (sec * min)
    const rate = new web3.BigNumber(1000);
    const wallet = "0x88d25dE3ceACa489aeb673cFf4AA744e838a8aAC"; //accounts[0];
    const goal = 500000000000000000; // 5 ether

    return deployer
        .then(() => { return deployer.deploy(GustavoCoin); })
        .then(() => { return deployer.deploy(RefundableGCC,openingTime,closingTime,rate,wallet,GustavoCoin.address,goal); });
      //  .then(() => { return deployer.deploy(TutorialToken); });
};

/*
module.exports = async function(deployer, network, accounts) {
  return await sambool(deployer, accounts);
};

async function sambool(deployer, accounts) {

  //const openingTime = web3.eth.getBlock('latest').timestamp + 60*2; // five secs in the future

  const openingTime = web3.eth.getBlockNumber((err, res) => {
    return res;
  });
  const closingTime = openingTime + 60*15; // time in the future (sec * min)
  const rate = new web3.BigNumber(1000);
  const wallet = accounts[0];
  const goal = 5000000000000000000; // 5 ether

  return deployer
      .then(() => { return deployer.deploy(GustavoCoin); })
      .then(() => { return deployer.deploy(RefundableGCC,openingTime,closingTime,rate,wallet,GustavoCoin.address,goal); })
      .then(() => { return deployer.deploy(TutorialToken); });
}
**/
