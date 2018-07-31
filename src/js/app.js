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
    $.getJSON('RefundableGCC.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var RefundableGCCArtifact = data;
      App.contracts.RefundableGCC = TruffleContract(RefundableGCCArtifact);

      // Set the provider for our contract.
      App.contracts.RefundableGCC.setProvider(App.web3Provider);

      // Use our contract to retieve and mark the adopted pets.
      return App.refreshPage();
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
    $(document).on('click', '#reserveButton', App.reserveTickets);
    $(document).on('click', '#idtransferOwnership', App.transferOwnership);
    $(document).on('click', '#idFinalize', App.finalize);
    $(document).on('click', '#idClaimRefund', App.claimRefund);
    $(document).on('click', '#idRefresh', App.refreshPage);
  },

  refreshPage: function() {
    App.getState();
    App.getOpeningTime();
    App.getClosingTime();
    App.getTokenAddress();
    App.getTokenOwner();
    App.getCrowdsaleAddress();
    App.getCrowdsaleOwner();
    App.getGoalReached();
    App.getContractState(); //what is the difference between state (above) and contractState
    App.getTicketBalance();
    App.getEthBalance();
    App.getIsFinalized();
  },



// clickable functions are here (transactions)

  reserveTickets: function() {
    event.preventDefault();
    var refundableGCCInstance;
    var amount = parseInt($('#buyingAmount').val());
    console.log('Attempting to reserve ' + amount + ' tickets.');

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
                  //var account = accounts[0];
                  App.contracts.RefundableGCC.deployed().then(function(instance) {
                  refundableGCCInstance = instance;
                    return refundableGCCInstance.sendTransaction( {from: accounts[0], value: web3.toWei(amount/100, 'ether')});
                  }).then(function(result) {
                     alert('Transfer Successful!');
                     return App.refreshPage();
                  }).catch(function(err) {
                     console.log(err.message);
                  });
    });
  },

  transferOwnership: function() {
    event.preventDefault();
    console.log('Attempting to change ownership of the Token..');
    var refundableGCCInstance;
                App.contracts.RefundableGCC.deployed().then(function(instance) {
                refundableGCCInstance = instance;
                                    App.contracts.GustavoCoin.deployed().then(function(instance) {
                                      gustavoCoinInstance = instance;
                                      return gustavoCoinInstance.transferOwnership(refundableGCCInstance.address);
                                    }).then(function(result) {
                                       alert('Ownership have transferred');
                                    }).catch(function(err) {
                                       console.log(err.message);
                                    });
                }).then(function(result) {
                   //alert('Ownership have transferred');
                }).catch(function(err) {
                   console.log(err.message);
                });
  },


  finalize: function() {
    event.preventDefault();
    console.log('Attempting to finalize contract by owner..');
    var refundableGCCInstance;
                App.contracts.RefundableGCC.deployed().then(function(instance) {
                refundableGCCInstance = instance;
                return refundableGCCInstance.finalize();
                }).then(function(result) {
                   console.log('finalization clicked');
                }).catch(function(err) {
                   console.log(err.message);
                });
  },


  claimRefund: function() {
    event.preventDefault();
    console.log('Attempting to finalize contract by owner..');
    var refundableGCCInstance;
                App.contracts.RefundableGCC.deployed().then(function(instance) {
                refundableGCCInstance = instance;
                return refundableGCCInstance.claimRefund();
                }).then(function(result) {
                   console.log('claim refund clicked');
                }).catch(function(err) {
                   console.log(err.message);
                });
  },



///  state variable & waller readers (they are not transactions)

  getState: function() {
    var refundableGCCInstance;
    console.log('Attempting to get contract state...');
                App.contracts.RefundableGCC.deployed().then(function(instance) {
                  refundableGCCInstance = instance;
                  return refundableGCCInstance.getStateFrom();
                }).then(function(result) {
                   console.log('contract state is: '+result);
                   //$('#contractStart').text(result);
                }).catch(function(err) {
                   console.log(err.message);
                });
    //return App.getOpeningTime();
  },


  getOpeningTime: function() {
    var refundableGCCInstance;
    console.log('Attempting to get start time...');
                App.contracts.RefundableGCC.deployed().then(function(instance) {
                  refundableGCCInstance = instance;
                  return refundableGCCInstance.timeToStartContract();
                }).then(function(result) {
                  time = result.c[0];

                  console.log('the opening time is: '+time);
                  $('#contractStart').text(time);
                }).catch(function(err) {
                  console.log(err.message);
                });
    //return App.getClosingTime();
  },


  getClosingTime: function() {
    var refundableGCCInstance;
    console.log('get closing time...');
                App.contracts.RefundableGCC.deployed().then(function(instance) {
                  refundableGCCInstance = instance;
                  return refundableGCCInstance.timeToCloseContract();
                }).then(function(result) {
                  time = result.c[0];
                  $('#contractClose').text(time);
                }).catch(function(err) {
                  console.log(err.message);
                });
    //return App.getTokenAddress();
  },


  getTokenAddress: function() {
    console.log('Attempting to get token address...');
    var gustavoCoinInstance;
                App.contracts.GustavoCoin.deployed().then(function(instance) {
                  gustavoCoinInstance = instance;
                  $('#idTokenAddress').text(gustavoCoinInstance.address);
                });
    //return App.getCrowdsaleAddress();
  },

/*
  getEscrowAddress: function() {
    console.log('Attempting to get escrow address...');
    var refundableGCCInstance;
                App.contracts.RefundableGCC.deployed().then(function(instance) {
                  refundableGCCInstance = instance;
                  return refundableGCCInstance.getEscrowAddress();
                }).then(function(result) {
                        console.log('the escrow address is'+result);
                        $('#idEscrowAddress').text(result);
                }).catch(function(err) {
                        console.log(err.message);
                });
    return App.getCrowdsaleAddress();
  },
**/


  getCrowdsaleAddress: function() {
    console.log('Attempting to get crowdsale address...');
    var refundableGCCInstance;
                App.contracts.RefundableGCC.deployed().then(function(instance) {
                  refundableGCCInstance = instance;
                  $('#idCrowdsaleAddress').text(refundableGCCInstance.address);
                });
    //return App.getTokenOwner();
  },


  getTokenOwner: function() {
    console.log('Attempting to get token owner...');
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
    //return App.getCrowdsaleOwner();
  },


  getCrowdsaleOwner: function() {
    console.log('Attempting to get crowdsale owner...');
    var refundableGCCInstance;
                App.contracts.RefundableGCC.deployed().then(function(instance) {
                  refundableGCCInstance = instance;
                  return refundableGCCInstance.owner_.call();
                }).then(function(result) {
                  console.log(result);
                  $('#idCrowdsaleOwner').text(result);
                }).catch(function(err) {
                  console.log(err.message);
                });
    //return App.getEscrowBalance();
  },

/*
  getEscrowOwner: function() {
    console.log('Attempting to get escrow owner...');
    var refundableGCCInstance;
                App.contracts.RefundableGCC.deployed().then(function(instance) {
                        refundableGCCInstance = instance;
                        return refundableGCCInstance.getEscrowAddress();
                }).then(function(result) {
                        $('#idEscrowOwner').text(result);
                        console.log('Escrow owner is ' + result);
                }).catch(function(error) {
                        console.log(err.message);
                });
    return App.getPhase1deadline();
  },
**/
/*
  getPhase1deadline: function() {
    var refundableGCCInstance;
    console.log('Attempting to get phase 1 deadline...');
                App.contracts.RefundableGCC.deployed().then(function(instance) {
                  refundableGCCInstance = instance;
                  return refundableGCCInstance.timeToPhase1Deadline();
                }).then(function(result) {
                        time = result.c[0];
                        $('#phase1deadline').text(time);
                }).catch(function(err) {
                        console.log(err.message);
                });
    return App.getPhase2deadline();
  },


  getPhase2deadline: function() {
    var refundableGCCInstance;
    console.log('Attempting to get phase 2 deadline...');
                App.contracts.RefundableGCC.deployed().then(function(instance) {
                  refundableGCCInstance = instance;
                  return refundableGCCInstance.timeToPhase2Deadline();
                }).then(function(result) {
                        time = result.c[0];
                        $('#phase2deadline').text(time);
                }).catch(function(err) {
                        console.log(err.message);
                });
    return App.getEscrowBalance();
  },

**/
  getEscrowBalance: function() {
    var refundableGCCInstance;
    console.log('Attempting to get Escrow balance...');
                App.contracts.RefundableGCC.deployed().then(function(instance) {
                        refundableGCCInstance = instance;
                        return refundableGCCInstance.getEscrowAddress();
                }).then(function(resultAdr) {
                  web3.eth.getBalance(resultAdr, function(error, result){
                      if(!error) {
                        $('#idConractBalanceEth').text(result/1000000000000000000);
                        console.log('Escrow owner is ' + result);
                      }else
                        console.error(error);
                      })
                }).catch(function(err) {
                  console.log(err.message);
                });
    //return App.getGoalReached();
  },


  getGoalReached: function() {
    var refundableGCCInstance;
    console.log('Attempting to get goal reached status...');
                App.contracts.RefundableGCC.deployed().then(function(instance) {
                        refundableGCCInstance = instance;
                        return refundableGCCInstance.goalReached();
                }).then(function(result) {
                  $('#idGoalReached').text(result);
                  console.log('Goal reached is ' + result);
                }).catch(function(err) {
                  console.log(err.message);
                });
    //return App.getContractState();
  },


  getContractState: function() { //to get the status of the Crowdsale status (Active, Closed, or Refunding)
    var refundableGCCInstance;
    console.log('Attempting to get contract status...');
                App.contracts.RefundableGCC.deployed().then(function(instance) {
                        refundableGCCInstance = instance;
                        return refundableGCCInstance.state.call();
                }).then(function(result) {
                  $('#idGoalReached').text(result);
                  console.log('contract status is ' + result);
                }).catch(function(err) {
                  console.log(err.message);
                });
    //return App.getTicketBalance();
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

    //return App.getEthBalance();
  },


  getEthBalance: function() {
    var refundableGCCInstance;
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
    //return App.getIsFinalized();
  },



  getIsFinalized: function() {
    console.log('Attempting to get finalized status...');
    var refundableGCCInstance;
    var status;
                App.contracts.RefundableGCC.deployed().then(function(instance) {
                        refundableGCCInstance = instance;
                        return refundableGCCInstance.isFinalized.call();
                }).then(function(result) {
                  console.log('finalized status is '+result);
                  $('#idIsFinalized').text(result);
                }).catch(function(err) {
                  console.log(err.message);
                });
    //return App.lastFunc();
  },


  lastFunc: function() {}                           //    can we just keep that at the end

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
