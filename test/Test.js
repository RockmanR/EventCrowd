const RefundableGCC = artifacts.require("./RefundableGCC.sol");
const GustavoCoin = artifacts.require("./GustavoCoin.sol");

/*
contract('Testing Refundable Crowdsale', function(accounts) {
  it("Change the ownership of the Token from you to the Crowdsale contract", function() {
    var refundableGCCInstance;

    return RefundableGCC.deployed().then(function(instance) {
      refundableGCCInstance = instance;
      return RefundableGCC.deployed().then(function(instance1) {
        gustavoCoinInstance = instance1;
        gustavoCoinInstance.transferOwnership(refundableGCCInstance.address, {from: accounts[0]});
    }).then(function() {
        return gustavoCoinInstance.owner.call();
    }).then(function(address) {
        assert.equal(address, refundableGCCInstance.address, "the addresses are not the same");
    });
  });
});
**/

/*
contract('Testing Refundable Crowdsale', function(accounts) {
  it("Change the ownership of the Token from you to the Crowdsale contract", function() {
    var refundableGCCInstance;
    var gustavoCoinInstance;
    var gustavoCoinInstance_owner;

    return RefundableGCC.deployed().then(function(instance) {
      refundableGCCInstance = instance;
      return RefundableGCC.deployed().then(function(instance1) {
        gustavoCoinInstance = instance1;
        gustavoCoinInstance.transferOwnership(refundableGCCInstance.address, {from: accounts[0]});
    }).then(function() {
        return gustavoCoinInstance.owner.call();
    }).then(function(address) {
        gustavoCoinInstance_owner = address;
    }).then(function() {
        ;//refundableGCCInstance.buyTokens(accounts[0],{value: 1000000000000000000});
    }).then(function() {
        return gustavoCoinInstance.owner.call();
    }).then(function(address1) {
        assert.equal(address1, refundableGCCInstance.address, "the addresses are not the same");
        //assert.equal(tokenBalance, 5, "it doesn't work");
    });
  });
});
**/


contract('Testing Refundable Crowdsale contract', async (accounts) => {

  it("Token contract deployed successfully and owned by the Owner (you)", async () => {
     let owner = accounts[0];
     let gustavoCoinInstance   = await GustavoCoin.deployed();
     let gustavoCoinInstance_owner = await gustavoCoinInstance.owner.call();
     assert.equal(gustavoCoinInstance_owner, owner);
  })

  it("Crowdsale contract deployed successfully and owned by the Owner (you)", async () => {
     let owner = accounts[0];
     let refundableGCCInstance = await RefundableGCC.deployed();
     let refundableGCCInstance_owner = await refundableGCCInstance.owner_.call();
     assert.equal(refundableGCCInstance_owner, owner);
  })

  it("Change the ownership of the Token contract from the Owner (you) to the Crowdsale contract", async () => {
     let refundableGCCInstance = await RefundableGCC.deployed();
     let gustavoCoinInstance   = await GustavoCoin.deployed();
     await gustavoCoinInstance.transferOwnership(refundableGCCInstance.address, {from: accounts[0]});
     let gustavoCoinInstance_owner = await gustavoCoinInstance.owner.call();
     assert.equal(gustavoCoinInstance_owner, refundableGCCInstance.address);
  })

  it("Make sure no Tokens have been minted yet (zero balance)", async () => {
     //let refundableGCCInstance = await RefundableGCC.deployed();
     let gustavoCoinInstance   = await GustavoCoin.deployed();
     let totalSupply = await gustavoCoinInstance.totalSupply();
     assert.equal(totalSupply, 0);
  })


/*
  it("Buy 1 tickets (tokens) from the Crowdsale contract", async () => {
     let refundableGCCInstance = await RefundableGCC.deployed();
     let gustavoCoinInstance   = await GustavoCoin.deployed();
     await refundableGCCInstance.buyTokens(accounts[0],{from: accounts[0], value: 1000000000000000000});//account_two, {from: account_two, value: 1000000000000000000}
     let x = await gustavoCoinInstance.balanceOf.call(accounts[0]);
     let tokenBalance = x.toNumber();
     assert.equal(tokenBalance, 5, "the balances are not equal");
  })

  it("click finalize contract", async () => {
     let refundableGCCInstance = await RefundableGCC.deployed();
     let gustavoCoinInstance   = await GustavoCoin.deployed();
     await refundableGCCInstance.finalize();
     let gustavoCoinInstance_owner = await gustavoCoinInstance.owner.call();
     assert.equal(gustavoCoinInstance_owner, refundableGCCInstance.address);
  })




/*
  it("should call a function that depends on a linked library", async () => {
    let meta = await MetaCoin.deployed();
    let outCoinBalance = await meta.getBalance.call(accounts[0]);
    let metaCoinBalance = outCoinBalance.toNumber();
    let outCoinBalanceEth = await meta.getBalanceInEth.call(accounts[0]);
    let metaCoinEthBalance = outCoinBalanceEth.toNumber();
    assert.equal(metaCoinEthBalance, 2 * metaCoinBalance);

  });

  it("should send coin correctly", async () => {

    // Get initial balances of first and second account.
    let account_one = accounts[0];
    let account_two = accounts[1];

    let amount = 10;


    let instance = await MetaCoin.deployed();
    let meta = instance;

    let balance = await meta.getBalance.call(account_one);
    let account_one_starting_balance = balance.toNumber();

    balance = await meta.getBalance.call(account_two);
    let account_two_starting_balance = balance.toNumber();
    await meta.sendCoin(account_two, amount, {from: account_one});

    balance = await meta.getBalance.call(account_one);
    let account_one_ending_balance = balance.toNumber();

    balance = await meta.getBalance.call(account_two);
    let account_two_ending_balance = balance.toNumber();

    assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
  });
**/
})
