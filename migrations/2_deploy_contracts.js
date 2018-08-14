const MyCrowdsale         = artifacts.require('./MyCrowdsale.sol');
const MyToken              = artifacts.require('./MyToken_01.sol');

module.exports = function(deployer) { 
    return deployer
        .then(() => { return deployer.deploy(MyToken); })
        .then(() => { return deployer.deploy(MyCrowdsale,MyToken.address); });
};
