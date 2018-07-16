App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('TutorialToken.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var TutorialTokenArtifact = data;
      App.contracts.TutorialToken = TruffleContract(TutorialTokenArtifact);

      // Set the provider for our contract.
      App.contracts.TutorialToken.setProvider(App.web3Provider);

      // Use our contract to retieve and mark the adopted pets.
      return App.getBalances();
    })
    $.getJSON('RefundableGCC.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var RefundableGCCArtifact = data;
      App.contracts.RefundableGCC = TruffleContract(RefundableGCCArtifact);

      // Set the provider for our contract.
      App.contracts.RefundableGCC.setProvider(App.web3Provider);

      // Use our contract to retieve and mark the adopted pets.
      return App.getOpeningTime();
    })
    $.getJSON('GustavoCoin.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var GustavoCoinArtifact = data;
      App.contracts.GustavoCoin = TruffleContract(GustavoCoinArtifact);

      // Set the provider for our contract.
      App.contracts.GustavoCoin.setProvider(App.web3Provider);

      //return App.getOpeningTime();
    })
    ;

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '#transferButton', App.handleTransfer);
    $(document).on('click', '#reserveButton', App.reserveTickets);
    $(document).on('click', '#idChangeOwnership', App.changeOwnership);
  },

  handleTransfer: function(event) {
    event.preventDefault();
    var amount = parseInt($('#TTTransferAmount').val());
    var toAddress = $('#TTTransferAddress').val();
    var tutorialTokenInstance;
    console.log('Transfer ' + amount + ' TT to ' + toAddress);

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
                var account = accounts[0];
                App.contracts.TutorialToken.deployed().then(function(instance) {
                  tutorialTokenInstance = instance;
                  return tutorialTokenInstance.transfer(toAddress, amount, {from: account, gas: 100000});
                }).then(function(result) {
                        alert('Transfer Successful!');
                  return App.getBalances();
                }).catch(function(err) {
                        console.log(err.message);
                });
    });
  },

  reserveTickets: function() {
    event.preventDefault();
    var RefundableGCCInstance;
    //var crowdsaleAddress;
    var amount = parseInt($('#buyingAmount').val());
    console.log('Attempting to reserve ' + amount + ' tickets.');

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
                  var account = accounts[0];
                  App.contracts.RefundableGCC.deployed().then(function(instance) {
                  RefundableGCCInstance = instance;
                    //return RefundableGCCInstance.buyTokens(account, {from: account, value: web3.toWei(1, 'ether'), gas: 21000, web3.toWei(20,'Gwei')}); //for reference only (can be deleted later)
                    return RefundableGCCInstance.buyTokens(account, {from: account, value: web3.toWei(amount/100, 'ether')}); //to continue
                  }).then(function(result) {
                          alert('Transfer Successful!');
                    return App.getBalances();
                  }).catch(function(err) {
                          console.log(err.message);
                  });
    });
  },

  changeOwnership: function() {
    event.preventDefault();
    console.log('Attempting to change ownership of the Token..');
    var RefundableGCCInstance;
                App.contracts.RefundableGCC.deployed().then(function(instance) {
                RefundableGCCInstance = instance;
                                    App.contracts.GustavoCoin.deployed().then(function(instance) {
                                      gustavoCoinInstance = instance;
                                      gustavoCoinInstance.transferOwnership(RefundableGCCInstance.address);
                                    }).then(function(result) {
                                            //do something if you want
                                    }).catch(function(err) {
                                            console.log(err.message);
                                    });
                }).then(function(result) {
                        alert('Ownership have transferred');
                }).catch(function(err) {
                        console.log(err.message);
                });
  },


    getBalances: function() {
      var tutorialTokenInstance;
      console.log('Getting balances...');
                App.contracts.TutorialToken.deployed().then(function(instance) {
                  tutorialTokenInstance = instance;
                  return tutorialTokenInstance.balanceOf(account);
                }).then(function(result) {
                        balance = result.c[0];
                        $('#TTBalance').text(balance);
                }).catch(function(err) {
                        console.log(err.message);
                });
    },

  getOpeningTime: function() {
    var RefundableGCCInstance;
    console.log('Attempting to get start time...');
                App.contracts.RefundableGCC.deployed().then(function(instance) {
                  RefundableGCCInstance = instance;
                  return RefundableGCCInstance.timeToStartContract();
                }).then(function(result) {
                        time = result.c[0];
                        console.log('the opening time is: '+time);
                        $('#contractStart').text(time);
                }).catch(function(err) {
                        console.log(err.message);
                });
    return App.getClosingTime();
  },


  getClosingTime: function() {
    var RefundableGCCInstance;
    console.log('get closing time...');
                App.contracts.RefundableGCC.deployed().then(function(instance) {
                  RefundableGCCInstance = instance;
                  return RefundableGCCInstance.timeToCloseContract();
                }).then(function(result) {
                        time = result.c[0];
                        $('#contractClose').text(time);
                }).catch(function(err) {
                        console.log(err.message);
                });
    return App.getTokenAddress();
  },



  getTokenAddress: function() {
    console.log('get token address...');
    var gustavoCoinInstance;
                App.contracts.GustavoCoin.deployed().then(function(instance) {
                  gustavoCoinInstance = instance;
                  $('#idTokenAddress').text(gustavoCoinInstance.address);
                });
    return App.getCrowdsaleAddress();
  },



  getCrowdsaleAddress: function() {
    console.log('get crowdsale address...');
    var RefundableGCCInstance;
                App.contracts.RefundableGCC.deployed().then(function(instance) {
                  RefundableGCCInstance = instance;
                  $('#idCrowdsaleAddress').text(RefundableGCCInstance.address);
                });
    return App.getTokenOwner();
  },


  getTokenOwner: function() {
    console.log('get token owner...');
    var gustavoCoinInstance;
                App.contracts.GustavoCoin.deployed().then(function(instance) {
                  gustavoCoinInstance = instance;
                  return gustavoCoinInstance.owner.call();
                }).then(function(result) {                                      //there might be a way to do it without 'then'
                        console.log(result);
                        $('#idTokenOwner').text(result);
                }).catch(function(err) {
                        console.log(err.message);
                });
    return App.getCrowdsaleOwner();
  },


  getCrowdsaleOwner: function() {
    console.log('get crowdsale owner...');
    var RefundableGCCInstance;
                App.contracts.RefundableGCC.deployed().then(function(instance) {
                  RefundableGCCInstance = instance;
                  return RefundableGCCInstance.owner_.call();
                }).then(function(result) {
                        console.log(result);
                        $('#idCrowdsaleOwner').text(result);
                }).catch(function(err) {
                        console.log(err.message);
                });
    return App.getPhase1deadline();
  },


  getPhase1deadline: function() {
    var RefundableGCCInstance;
    console.log('phase 1 deadline...');
                App.contracts.RefundableGCC.deployed().then(function(instance) {
                  RefundableGCCInstance = instance;
                  return RefundableGCCInstance.timeToPhase1Deadline();
                }).then(function(result) {
                        time = result.c[0];
                        $('#phase1deadline').text(time);
                }).catch(function(err) {
                        console.log(err.message);
                });
    return App.getPhase2deadline();
  },


  getPhase2deadline: function() {
    var RefundableGCCInstance;
    console.log('phase 2 deadline...');
                App.contracts.RefundableGCC.deployed().then(function(instance) {
                  RefundableGCCInstance = instance;
                  return RefundableGCCInstance.timeToPhase2Deadline();
                }).then(function(result) {
                        time = result.c[0];
                        $('#phase2deadline').text(time);
                }).catch(function(err) {
                        console.log(err.message);
                });
    return App.getContractBalance();
  },


  getContractBalance: function() {
    var RefundableGCCInstance;
    var contractBalance;
    var account;
    console.log('Attempting to get contract balance...');

/*
                App.contracts.RefundableGCC.deployed().then(function(instance) {
                  RefundableGCCInstance = instance;

                  RefundableGCCInstance.

**/
                                                           // work here
                App.contracts.RefundableGCC.deployed().then(function(instance) {
                  RefundableGCCInstance = instance; //currently not used...might be needed later. if not then delete
                  //return if needed
                }).then(function(result) {
                      web3.eth.getBalance('0xE8ae61A5C281A5dD77fF4956EC8aC490Ea4aaDe9', function(error, result){
                      if(!error) {
                        console.log(JSON.stringify(result));
                        $('#idConractBalanceEth').text(result);
                        console.log('contract balance is ' + result);
                      }else
                        console.error(error);
                      })
                }).catch(function(err) {
                        console.log(err.message);
                });
    return App.getTicketBalance();
  },


  getTicketBalance: function() {
    var gustavoCoinInstance;
    console.log('Attempting to get ticket balance...');

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
                    var account = accounts[0];
                    App.contracts.GustavoCoin.deployed().then(function(instance) {
                      gustavoCoinInstance = instance;
                      return gustavoCoinInstance.balanceOf.call(account);
                    }).then(function(result) {
                            console.log(result);
                            $('#idTicketBalance').text(result.toNumber()/10000000000000000000);
                    }).catch(function(err) {
                            console.log(err.message);
                    });
      });

    return App.getEthBalance();
  },


  getEthBalance: function() {
    var RefundableGCCInstance;
    var account;
    var ethBalance;
    console.log('Attempting to get Eth balance...');

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
                    account = accounts[0];
                    web3.eth.getBalance(account, function(error, result){
                        if(!error) {
                          $('#idEthBalance').text(result/1000000000000000000);
                            console.log(JSON.stringify(result));
                            console.log('contract balance is ' + result);
                        }else
                            console.error(error);
                    })
      });
    return App.lastFunc();
  },




  lastFunc: function() {}                           //    can we just keep that at the end

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
