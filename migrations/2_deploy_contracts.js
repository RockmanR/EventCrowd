const MyCrowdsale         = artifacts.require('./MyCrowdsale.sol');
const MyCrowdsale_Ganache = artifacts.require('./MyCrowdsale_Ganache.sol');
const OZT_00              = artifacts.require('./OZT_00.sol');

/**
* @dev Use the below (1st) deployment when you are using Ganache. This is a work around since i'm facing an issue trying to set the time through the contract. so the below code contains "getBlock" to set the openingTime & closingTime using web3 through Java Script.
* I don't have this issue when deploying to Geth or Infura, so use the 2nd deployment for them.
*/

////////////////////////                             ///////////////////////////
//////////////////////// 1st Deployment: for Ganache ///////////////////////////
////////////////////////                             ///////////////////////////
/*
module.exports = function(deployer, network, accounts) {
    var openingTime = web3.eth.getBlock('latest').timestamp + 15; // adding 60 seconds to the current ethereum time
    var closingTime = openingTime + 60*5; // adding (5 minutews) to openingTime

    return deployer
        .then(() => { return deployer.deploy(OZT_00); })
        .then(() => { return deployer.deploy(MyCrowdsale_Ganache,OZT_00.address,openingTime,closingTime); });
};
**/


/**
* @dev Use the below (2nd) deployment when you are using Geth or Infura.
*/

////////////////////////                                   ///////////////////////////
//////////////////////// 2nd Deployment: for Geth & Infura ///////////////////////////
////////////////////////                                   ///////////////////////////

module.exports = function(deployer, network, accounts) {
    return deployer
        .then(() => { return deployer.deploy(OZT_00); })
        .then(() => { return deployer.deploy(MyCrowdsale,OZT_00.address); });
};
