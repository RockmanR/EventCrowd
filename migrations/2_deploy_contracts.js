var TutorialToken = artifacts.require("TutorialToken");
const GustavoCoinCrowdsale = artifacts.require('./GustavoCoinCrowdsale.sol');
const GustavoCoin = artifacts.require('./GustavoCoin.sol');


module.exports = function(deployer, network, accounts) {
    const openingTime = web3.eth.getBlock('latest').timestamp + 5; // two secs in the future
    const closingTime = openingTime + 60*60*24*1; // one day in the future (60 sec * 60 min * 24 hours * 1 day)
    const rate = new web3.BigNumber(1000);
    const wallet = accounts[1];

    return deployer
        .then(() => { return deployer.deploy(GustavoCoin); })
        .then(() => { return deployer.deploy(GustavoCoinCrowdsale,openingTime,closingTime,rate,wallet,GustavoCoin.address); })
        .then(() => { return deployer.deploy(TutorialToken); });
};
