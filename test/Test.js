const MyCrowdsale = artifacts.require("./MyCrowdsale.sol");
const Token = artifacts.require("./MyToken_01.sol");

contract('Testing MyCrowdsale_01 contract', async (accounts) => {

  it("Token contract deployed successfully and owned by the Owner (you)", async () => {
     let owner = accounts[0];
     let tokenInstance   = await Token.deployed();
     let tokenInstance_owner = await tokenInstance.owner.call();
     assert.equal(tokenInstance_owner, owner);
  })

  it("Crowdsale contract deployed successfully and owned by the Owner (you)", async () => {
     let owner = accounts[0];
     let myCrowdsaleInstance = await MyCrowdsale.deployed();
     let myCrowdsaleInstance_owner = await myCrowdsaleInstance.owner_.call();
     assert.equal(myCrowdsaleInstance_owner, owner);
  })

  it("Change the ownership of the Token contract from the Owner (you) to the Crowdsale contract", async () => {
     let myCrowdsaleInstance = await MyCrowdsale.deployed();
     let tokenInstance   = await Token.deployed();
     await tokenInstance.transferOwnership(myCrowdsaleInstance.address, {from: accounts[0]});
     let tokenInstance_owner = await tokenInstance.owner.call();
     assert.equal(tokenInstance_owner, myCrowdsaleInstance.address);
  })

  it("Make sure no Tokens have been minted yet (zero balance)", async () => {
     let tokenInstance   = await Token.deployed();
     let totalSupply = await tokenInstance.totalSupply();
     assert.equal(totalSupply, 0);
  })

  /**
  * @dev we need to override the contract timing when conducting tests through truffle.
  * the reason is: truffle execute the tests without waiting until the contract gets started.
  */
  it("Modify contract timings: to start now and end after few seconds (needed for truffle testing)", async () => {
     let myCrowdsaleInstance = await MyCrowdsale.deployed();
     let tokenInstance   = await Token.deployed();
     await myCrowdsaleInstance.setTime(0,100);
     let x = await myCrowdsaleInstance.timeToCloseContract();
     let time = x.toNumber();
     assert.isAbove(time, 50, "time is set");
  })

  it("Buy 1 ticket (token) from the Crowdsale contract", async () => {
     let myCrowdsaleInstance = await MyCrowdsale.deployed();
     let tokenInstance   = await Token.deployed();
     await myCrowdsaleInstance.buyTokens(accounts[0],{from: accounts[0], value: web3.toWei(0.01, 'ether')});//account_two, {from: account_two, value: 1000000000000000000} web3.toWei(1, 'ether')
     let x = await tokenInstance.balanceOf.call(accounts[0]);
     let tokenBalance = x.toNumber();
     let answer = web3.toWei(0.01, 'ether') * 100 ; // multiplied by 100 since every 0.01 eth is equal to 1 ticket.
     assert.equal(tokenBalance, answer, "the balances are not equal");
  })

})
