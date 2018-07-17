var TutorialToken = artifacts.require("TutorialToken");
const RefundableGCC = artifacts.require('./RefundableGCC.sol');
const GustavoCoin = artifacts.require('./GustavoCoin.sol');


module.exports = function(deployer, network, accounts) {
    const openingTime = web3.eth.getBlock('latest').timestamp + 10; // five secs in the future
    const closingTime = openingTime + 60*2; // one day in the future (60 sec * 10 min)
    const rate = new web3.BigNumber(1000);
    const wallet = accounts[0];
    const goal = 5000000000000000000; // 5 ether

    return deployer
        .then(() => { return deployer.deploy(GustavoCoin); })
        .then(() => { return deployer.deploy(RefundableGCC,openingTime,closingTime,rate,wallet,GustavoCoin.address,goal); })
        .then(() => { return deployer.deploy(TutorialToken); });
};
